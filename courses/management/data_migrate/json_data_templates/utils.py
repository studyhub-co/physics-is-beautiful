import re

def mq(val):
    """
    convert to mathquill text
    :param val:
    :return:
    """
    # replace whitespaces to support mathquill output
    # remove MathJax support, we have mathquill Static field
    val = re.sub(r'\\\(', '', val)
    val = re.sub(r'\\\)', '', val)
    val = re.sub(r'<br>', '', val)
    val = re.sub(r'\s', '\\\\ ', val)
    return val