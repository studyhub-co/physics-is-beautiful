import io
import asyncio
import threading

from django.shortcuts import get_object_or_404
from django.http import HttpResponse
from django.urls import reverse
from django.core import files

from PIL import Image, ImageDraw, ImageFont

from pyppeteer import launch, errors


def get_mock_png():
    img = Image.new('RGB', (648, 480), color=(255, 255, 255, 255))

    d = ImageDraw.Draw(img)
    font = ImageFont.truetype("DejaVuSans.ttf", 32)
    d.text((10, 200), "The screenshot temporarily unavailable", fill=(0, 0, 0, 255), font=font)
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
    try:
        await page.goto(screenshot_url, {'waitUntil': 'networkidle2', 'timeout': 20000})
        await page.waitForSelector('#root')
    except errors.TimeoutError:
        return get_mock_png()

    screen = await page.screenshot()
    await page.close()
    await browser.close()

    return screen


def save_img(screenshot_url, mpt):
    # run
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    screenshot = loop.run_until_complete(get_screen(screenshot_url))

    import tempfile
    lf = tempfile.NamedTemporaryFile()
    # Write image block to temporary file
    lf.write(screenshot)

    mpt.screenshot_url.save(str(mpt.uuid)+'.png', files.File(lf))


def get_sandbox_image(request, pt_uuid):
    # TODO cache it (or save in sandbox model)
    screenshot_url = '{}://{}{}'.format(request.scheme,
                                        request.META.get('HTTP_HOST'),
                                        reverse('courses:material-type-frame', args=[pt_uuid, ]))
    # loop = asyncio.new_event_loop()
    # asyncio.set_event_loop(loop)
    # screenshot = loop.run_until_complete(get_screen(screenshot_url))
    # get material problem type
    from .models import MaterialProblemType
    mpt = get_object_or_404(MaterialProblemType, uuid=pt_uuid)

    # # generate image in the background
    # t = threading.Thread(target=save_img, args=[screenshot_url, mpt])
    # t.setDaemon(True)
    # t.start()

    # return that we have
    if mpt.screenshot_url:
        from django.shortcuts import redirect
        return redirect(str(mpt.screenshot_url.url))
    else:
        screenshot = get_mock_png()

    response = HttpResponse(content_type="image/png")
    response.write(screenshot)
    return response
