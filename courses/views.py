# import time
# from selenium import webdriver
# from selenium.webdriver.chrome.options import Options

import io

from django.http import HttpResponse
from django.urls import reverse

from PIL import Image, ImageDraw, ImageFont

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
from pyppeteer import launch, errors


def get_mock_png():
    img = Image.new('RGB', (648, 480), color=(255, 255, 255, 255))

    d = ImageDraw.Draw(img)
    font = ImageFont.truetype("arial.ttf", 32)
    d.text((100, 200), "The screenshot temporary unavailable", fill=(0, 0, 0, 255), font=font)
    img_byte_arr = io.BytesIO()
    img.save(img_byte_arr, format='PNG')
    img = img_byte_arr.getvalue()

    return img


async def get_screen(screenshot_url):
    browser = await launch(
        handleSIGINT=False,
        handleSIGTERM=False,
        handleSIGHUP=False,
        headless=True,
        timeout=0,
        args=['--no-sandbox', '--disable-setuid-sandbox'],  # disable Chrome sandbox
        # args=['--disable-dev-shm-usage', ] - docker setting
    )
    page = await browser.newPage()
    await page.goto(screenshot_url, {'waitUntil': 'networkidle2', 'timeout': 30})
    try:
        await page.waitForSelector('#root')
    except errors.TimeoutError:
        img = Image.new('RGB', (648, 480), color=(255, 255, 255, 255))

        d = ImageDraw.Draw(img)
        font = ImageFont.truetype("DejaVuSans.ttf", 32)
        d.text((100, 200), "The screenshot is not available", fill=(0, 0, 0, 255), font=font)
        img_byte_arr = io.BytesIO()
        img.save(img_byte_arr, format='PNG')
        img = img_byte_arr.getvalue()

        await page.close()
        await browser.close()

        return img

    screen = await page.screenshot()
    await page.close()
    await browser.close()

    return screen


def get_sandbox_image(request, pt_uuid):
    # TODO cache it (or save in sandbox model)
    # screenshot_url = '{}://{}{}'.format(request.scheme,
    #                                     request.META.get('HTTP_HOST'),
    #                                     reverse('courses:material-frame', args=[pt_uuid, ]))
    # loop = asyncio.new_event_loop()
    # asyncio.set_event_loop(loop)
    # screenshot = loop.run_until_complete(get_screen(screenshot_url))
    screenshot = get_mock_png()
    response = HttpResponse(content_type="image/png")
    response.write(screenshot)
    return response
