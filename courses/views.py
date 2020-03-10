# import time
# from selenium import webdriver
# from selenium.webdriver.chrome.options import Options
#
from django.http import HttpResponse
from django.urls import reverse


# def get_sandbox_image(request, pt_uuid):
#     # TODO cache it
#     options = Options()
#     options.add_argument("--headless")
#     driver = webdriver.Chrome(chrome_options=options)
#     # driver = webdriver.PhantomJS("c://work//upwork//pib//phantomjs-2.1.1-windows//bin//phantomjs.exe")
#     driver.set_window_size(1920, 1080)
#     screenshot_url = 'http://127.0.0.1:8000/' + reverse('courses:material-frame', args=[pt_uuid, ])
#     driver.get(screenshot_url)
#     time.sleep(3)
#     screenshot = driver.get_screenshot_as_png()
#     response = HttpResponse(content_type="image/png")
#     response.write(screenshot)
#     return response

import asyncio
from pyppeteer import launch


async def get_screen(screenshot_url):
    browser = await launch(
        handleSIGINT=False,
        handleSIGTERM=False,
        handleSIGHUP=False,
        headless=True,
        timeout=0,
        # args=['--disable-dev-shm-usage', ] - docker setting
    )
    page = await browser.newPage()
    await page.goto(screenshot_url, {'waitUntil': 'networkidle2', 'timeout': 0})
    await page.waitForSelector('#root')
    screen = await page.screenshot()
    await page.close()
    await browser.close()

    return screen


def get_sandbox_image(request, pt_uuid):
    # TODO cache it (or save in sandbox model)
    screenshot_url = '{}://{}{}'.format(request.scheme,
                                        request.META.get('HTTP_HOST'),
                                        reverse('courses:material-frame', args=[pt_uuid, ]))
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    screenshot = loop.run_until_complete(get_screen(screenshot_url))
    response = HttpResponse(content_type="image/png")
    response.write(screenshot)
    return response
