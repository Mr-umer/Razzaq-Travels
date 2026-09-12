import os
from PIL import Image, ImageOps

logo_path = r"c:\Users\umarf\Downloads\Design Razzaq Travels Website\src\imports\image-4.png"
public_dir = r"c:\Users\umarf\Downloads\Design Razzaq Travels Website\public"

os.makedirs(public_dir, exist_ok=True)

img = Image.open(logo_path).convert("RGBA")

# Extract non-white/transparent bounding box
# Make white background pixels transparent first
datas = img.getdata()
newData = []
for item in datas:
    # If pixel is close to white (R,G,B > 240)
    if item[0] > 230 and item[1] > 230 and item[2] > 230:
        newData.append((255, 255, 255, 0))
    else:
        newData.append(item)

img.putdata(newData)

# Get bounding box of content
bbox = img.getbbox()
if bbox:
    cropped = img.crop(bbox)
else:
    cropped = img

# Make a square padded icon
w, h = cropped.size
max_dim = max(w, h)
square = Image.new("RGBA", (max_dim, max_dim), (0, 0, 0, 0))
offset_x = (max_dim - w) // 2
offset_y = (max_dim - h) // 2
square.paste(cropped, (offset_x, offset_y), cropped)

# Resize to standard sizes: 32x32, 64x64, 180x180, 512x512
fav_32 = square.resize((32, 32), Image.Resampling.LANCZOS)
fav_64 = square.resize((64, 64), Image.Resampling.LANCZOS)
fav_180 = square.resize((180, 180), Image.Resampling.LANCZOS)
fav_512 = square.resize((512, 512), Image.Resampling.LANCZOS)

fav_32.save(os.path.join(public_dir, "favicon-32x32.png"))
fav_64.save(os.path.join(public_dir, "favicon.png"))
fav_180.save(os.path.join(public_dir, "apple-touch-icon.png"))
fav_512.save(os.path.join(public_dir, "android-chrome-512x512.png"))

# Also save .ico
fav_32.save(os.path.join(public_dir, "favicon.ico"), format="ICO", sizes=[(32, 32), (64, 64)])

print("Favicons generated successfully in public/")
