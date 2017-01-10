import functools
import inspect
import pkg_resources
from types import ModuleType

import six
from six.moves import filter


try:
    __version__ = pkg_resources.get_distribution('python-monkey-business').version
except pkg_resources.DistributionNotFound:
    __version__ = None


def patch(func=None, obj=None, name=None, avoid_doublewrap=True):
    """
    Decorator for monkeypatching functions on modules and classes.

    Example::

        # This replaces FooClass.bar with our method
        @monkeybiz.patch(FooClass)
        def bar(original_bar, *args, **kwargs):
            print "Patched!"
            return original_bar(*args, **kwargs)

        # This replaces FooClass.bar and foomodule.bar with our method
        @monkeybiz.patch([FooClass, foomodule])
        def bar(original_bar, *args, **kwargs):
            #...

    The first argument to ``monkeybiz.patch`` can be either a module, a class,
    or a list of modules and/or classes. The decorator also takes optional
    ``name`` and ``avoid_doublewrap`` keyword arguments. If ``name`` is
    omitted, the name of the function being patched will be the name of the
    function being decorated. If ``avoid_doublewrap`` is True (the default),
    then functions and methods can only be patched once using this function.

    Use ``monkeybiz.unpatch()`` to revert a monkey-patched function to its
    original.
    """
    if obj is None:
        if isinstance(func, (type, ModuleType)):
            obj = func
            func = None
        elif isinstance(func, (list, tuple)) and all([isinstance(i, (ModuleType, type)) for i in func]):
            obj = func
            func = None

    if func is None:
        return functools.partial(patch, obj=obj, name=name, avoid_doublewrap=avoid_doublewrap)

    if name is None:
        name = func.__name__

    if isinstance(obj, (list, tuple)) and all([isinstance(i, (ModuleType, type)) for i in obj]):
        return [patch(func=func, obj=o, name=name, avoid_doublewrap=avoid_doublewrap) for o in obj]

    if not isinstance(obj, (ModuleType, type)):
        raise ValueError(
            "Argument passed to @patch decorator must be a "
            "class or module, or a list of classes and modules")

    try:
        call = getattr(obj, name)
    except AttributeError:
        raise TypeError("%(func_repr)s does not exist" % {
            'func_repr': '.'.join(
                filter(None, [
                    getattr(obj, '__module__', None),
                    obj.__name__,
                    func.__name__],
                )),
        })

    # optionally avoid multiple identical wrappings
    if avoid_doublewrap and getattr(call, 'wrapper', None) is func:
        return

    # get underlying function (if it's an unbound method)
    try:
        original_callable = six.get_method_function(call)
    except AttributeError:
        original_callable = call

    @six.wraps(func)
    def wrapper(*args, **kwargs):
        return func(original_callable, *args, **kwargs)

    # set attributes, for future unwrapping and to avoid double-wrapping
    wrapper.original = call
    wrapper.wrapper = func

    if six.PY2 and inspect.isclass(obj):
        # rewrap staticmethod and classmethod specifically (iff obj is a class)
        if hasattr(call, 'im_self'):
            if call.im_self:
                wrapper = classmethod(wrapper)
        else:
            wrapper = staticmethod(wrapper)

    # finally, install the func closure as requested
    setattr(obj, name, wrapper)
    return getattr(obj, name)


def unpatch(obj, name):
    """
    Undo the effects of patch(func, obj, name)
    """
    setattr(obj, name, getattr(obj, name).original)
