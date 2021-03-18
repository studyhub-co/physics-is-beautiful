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


def get_evaluated_from_js_api(text):
    import requests

    url = 'http://127.0.0.1:3001/math/'
    body = {'mathLatex': text}
    x = requests.post(url, data=body)

    return x.text
