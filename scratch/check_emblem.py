import os
from PIL import Image, ImageDraw

logo_path = r"c:\Users\umarf\Downloads\Design Razzaq Travels Website\src\imports\image-4.png"
public_dir = r"c:\Users\umarf\Downloads\Design Razzaq Travels Website\public"

img = Image.open(logo_path).convert("RGBA")

# Bbox of logo content
diff = Image.new("L", img.size, 0)
pixels_img = img.load()
pixels_diff = diff.load()

for y in range(img.size[1]):
    for x in range(img.size[0]):
        r, g, b, a = pixels_img[x, y]
        if a > 10 and not (r > 240 and g > 240 and b > 240):
            pixels_diff[x, y] = 255

bbox = diff.getbbox()
cropped_logo = img.crop(bbox)
w, h = cropped_logo.size

# Save logo cropped image to check emblem
emblem = cropped_logo.crop((0, 0, min(h + 20, w), h))
emblem.save(r"c:\Users\umarf\Downloads\Design Razzaq Travels Website\scratch\logo_emblem.png")
print("Emblem size:", emblem.size)
