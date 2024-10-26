from fastapi import FastAPI, UploadFile, Form, Response
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from fastapi.staticfiles import StaticFiles
from typing import Annotated
import sqlite3
import base64

con = sqlite3.connect('db.db',check_same_thread=False)
cur = con.cursor()

cur.execute(f"""
            CREATE TABLE IF NOT EXISTS items (
   id INTEGER PRIMARY KEY, 
   title TEXT NOT NULL,
   image BLOB,
   price INTEGER NOT NULL,
   description TEXT,
   place TEXT NOT NULL,
   insertAt INTEGER NOT NULL
);
""")

app = FastAPI()

@app.post('/items')
async def create_item(
    image: UploadFile, 
    title: Annotated[str, Form()], 
    price: Annotated[int, Form()], 
    description: Annotated[str, Form()], 
    place: Annotated[str, Form()],
    insertAt: Annotated[int, Form()]
):

    image_bytes = await image.read()

    cur.execute("""
        INSERT INTO items (title, image, price, description, place, insertAt)
        VALUES (?, ?, ?, ?, ?, ?)
    """, (title, image_bytes, price, description, place, insertAt))

    con.commit()
    return '200'


@app.get('/items')
async def get_items():
    try:
        con.row_factory = sqlite3.Row
        cur = con.cursor()
        
        rows = cur.execute("""
                           SELECT * FROM items;
                           """).fetchall()
        
        result = []
        for row in rows:
            data = dict(row)
            if data['image']:
                data['image'] = base64.b64encode(data['image']).decode('utf-8')
            result.append(data)

        print(result)  

        return JSONResponse(content=jsonable_encoder(result))
    
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)
    

@app.get('/images/{item_id}')
async def get_image(item_id):
    try:
        cur = con.cursor()
        image_bytes = cur.execute(f"""
                                  SELECT image FROM items WHERE id={item_id}
                                  """).fetchone()
        
        if image_bytes and image_bytes[0]:
            encoded_image = base64.b64encode(image_bytes[0]).decode('utf-8')
            return JSONResponse(content={"image": encoded_image})
        else:
            return JSONResponse(content={"error": "Image not found"}, status_code=404)
    
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)



app.mount("/", StaticFiles(directory="frontend", html=True), name="frontend")

