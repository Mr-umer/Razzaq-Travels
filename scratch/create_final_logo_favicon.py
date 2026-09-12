import os
from PIL import Image, ImageDraw

logo_path = r"c:\Users\umarf\Downloads\Design Razzaq Travels Website\src\imports\image-4.png"
public_dir = r"c:\Users\umarf\Downloads\Design Razzaq Travels Website\public"

img = Image.open(logo_path).convert("RGBA")

# Extract logo emblem bounding box
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

# Extract the emblem (the square icon portion on the left)
emblem_raw = cropped_logo.crop((0, 0, int(h * 1.05), h))

# Remove white background from emblem
emblem_data = emblem_raw.getdata()
new_emblem_data = []
for item in emblem_data:
    if item[0] > 235 and item[1] > 235 and item[2] > 235:
        new_emblem_data.append((255, 255, 255, 0))
    else:
        new_emblem_data.append(item)

emblem_raw.putdata(new_emblem_data)
emblem_bbox = emblem_raw.getbbox()
if emblem_bbox:
    emblem = emblem_raw.crop(emblem_bbox)
else:
    emblem = emblem_raw

# Create high-res 512x512 circular badge canvas
size = 512
canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
draw = ImageDraw.Draw(canvas)

# Brand teal outer ring (#24C4B5)
draw.ellipse([10, 10, 502, 502], fill=(36, 196, 181, 255))

# White inner background
draw.ellipse([28, 28, 484, 484], fill=(255, 255, 255, 255))

# Scale emblem to fit inside inner circle perfectly
ew, eh = emblem.size
max_dim = 360
scale = min(max_dim / ew, max_dim / eh)
nw, nh = int(ew * scale), int(eh * scale)

emblem_resized = emblem.resize((nw, nh), Image.Resampling.LANCZOS)

# Center position
px = (size - nw) // 2
py = (size - nh) // 2

canvas.paste(emblem_resized, (px, py), emblem_resized)

# Save into public directory
canvas.save(os.path.join(public_dir, "android-chrome-512x512.png"))

fav_180 = canvas.resize((180, 180), Image.Resampling.LANCZOS)
fav_180.save(os.path.join(public_dir, "apple-touch-icon.png"))

fav_64 = canvas.resize((64, 64), Image.Resampling.LANCZOS)
fav_64.save(os.path.join(public_dir, "favicon.png"))

fav_32 = canvas.resize((32, 32), Image.Resampling.LANCZOS)
fav_32.save(os.path.join(public_dir, "favicon-32x32.png"))
fav_32.save(os.path.join(public_dir, "favicon.ico"), format="ICO", sizes=[(32, 32), (64, 64)])

print("Official emblem logo favicons generated successfully!")
