import urllib.request
import re

req = urllib.request.Request('https://en.wikipedia.org/wiki/Toxic_(upcoming_film)', headers={'User-Agent': 'Mozilla/5.0'})
try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
    match = re.search(r'<td class="infobox-image">.*?<img.*?src="([^"]+)"', html)
    if match:
        img_url = 'https:' + match.group(1)
        print("Found:", img_url)
        img_req = urllib.request.Request(img_url, headers={'User-Agent': 'Mozilla/5.0'})
        img_data = urllib.request.urlopen(img_req).read()
        out_path = r"c:\Users\STUDENT\Desktop\movie booking\frontend\public\images\toxic.jpg"
        with open(out_path, 'wb') as f:
            f.write(img_data)
        print("Done downloading to", out_path)
    else:
        print("Not found in HTML")
except Exception as e:
    print("Error:", e)
