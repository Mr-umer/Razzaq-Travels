import os
from PIL import Image

logo_path = r"c:\Users\umarf\Downloads\Design Razzaq Travels Website\src\imports\image-4.png"
public_dir = r"c:\Users\umarf\Downloads\Design Razzaq Travels Website\public"

img = Image.open(logo_path).convert("RGBA")

# Let's save a clear version of the whole logo fit inside a rounded badge so it's 100% readable and crisp on any browser tab background!
# Or let's see if the logo has an emblem on the left:
# Find non-white region bounding box
bg = Image.new("RGBA", img.size, (255, 255, 255, 255))
# Create mask where image is not pure white
diff = Image.new("L", img.size, 0)
pixels_img = img.load()
pixels_diff = diff.load()

for y in range(img.size[1]):
    for x in range(img.size[0]):
        r, g, b, a = pixels_img[x, y]
        if a > 10 and not (r > 240 and g > 240 and b > 240):
            pixels_diff[x, y] = 255

bbox = diff.getbbox()
print("Logo content bbox:", bbox)

if bbox:
    cropped_logo = img.crop(bbox)
    print("Cropped logo size:", cropped_logo.size)
else:
    cropped_logo = img

# 1. Create emblem favicon (left square of logo if it has emblem)
# 2. Create full logo favicon with a sleek white rounded container badge & shadow/teal border

# Create a high-res 512x512 canvas with brand teal background & white circle container for ultimate contrast & elegance
size = 512
canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))

# Draw a sleek circular / rounded rect badge in brand teal (#24C4B5)
from PIL import ImageDraw
draw = ImageDraw.Draw(canvas)

# Brand teal circle background
draw.ellipse([16, 16, 496, 496], fill=(36, 196, 181, 255))

# Inner white circle
draw.ellipse([36, 36, 476, 476], fill=(255, 255, 255, 255))

# Scale cropped logo to fit inside inner white circle nicely
max_w, max_h = 380, 240
w, h = cropped_logo.size
ratio = min(max_w / w, max_h / h)
new_w, new_h = int(w * ratio), int(h * ratio)

logo_resized = cropped_logo.resize((new_w, new_h), Image.Resampling.LANCZOS)

# Paste logo in center
pos_x = (size - new_w) // 2
pos_y = (size - new_h) // 2

# Composite logo onto canvas
canvas.paste(logo_resized, (pos_x, pos_y), logo_resized)

# Save high res favicons
canvas.save(os.path.join(public_dir, "android-chrome-512x512.png"))

fav_180 = canvas.resize((180, 180), Image.Resampling.LANCZOS)
fav_180.save(os.path.join(public_dir, "apple-touch-icon.png"))

fav_64 = canvas.resize((64, 64), Image.Resampling.LANCZOS)
fav_64.save(os.path.join(public_dir, "favicon.png"))

fav_32 = canvas.resize((32, 32), Image.Resampling.LANCZOS)
fav_32.save(os.path.join(public_dir, "favicon-32x32.png"))
fav_32.save(os.path.join(public_dir, "favicon.ico"), format="ICO", sizes=[(32, 32), (64, 64)])

print("Logo favicon created successfully!")
