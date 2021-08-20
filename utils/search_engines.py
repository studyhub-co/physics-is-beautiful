import socket

from django_user_agents.utils import get_user_agent
from ipware import get_client_ip


def is_search_engine_bot(request):
    user_agent = get_user_agent(request)
    if not user_agent.is_bot:
        return False
    ip, _ = get_client_ip(request)
    try:
        host = socket.gethostbyaddr(ip)[0]
    except (socket.herror, socket.error):
        return False
    domain_name = ".".join(host.split('.')[1:])
    if domain_name not in ['googlebot.com', 'google.com', 'search.msn.com', 'crawl.yahoo.net',
                           'yandex.ru', 'yandex.com', 'yandex.net',
                           'crawl.baidu.com', 'crawl.baidu.jp'
                           ]:
        return False
    host_ip = socket.gethostbyname(host)
    return host_ip == ip
