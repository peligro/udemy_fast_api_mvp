from fastapi import FastAPI, status, Request
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException
#dotenv
from dotenv import load_dotenv
load_dotenv()
import os

#rutas
from router.ejemplo_router import router as ejemplo_router
from router.upload_router import router as upload_router
from router.estado_router import router as estado_router
from router.categoria_router import router as categoria_router
from router.negocio_router import router as negocio_router
from router.negocio_logo_router import router as negocio_logo_router
from router.platos_categoria_router import router as platos_categoria_router
from router.platos_router import router as platos_router

app = FastAPI()

#swagger
description = """
API Rest creada desde Tamila.cl para UDEMY. 🚀

Se hizo con mucho cariño
"""
app = FastAPI(
    docs_url="/documentacion",
    title="API Rest con FastAPI",
    description=description,
    version="0.0.1",
    terms_of_service="https://www.cesarcancino.com",
    contact={
        "name": "cesarcancino.com",
        "url": "https://www..cesarcancino.com",
        "email": "yo@cesarcancino.com",
    },
    license_info={
        "name": "Apache 2.0",
        "url": "https://www.apache.org/licenses/LICENSE-2.0.html",
    },
    openapi_tags=[
        {
            "name": "Ejemplo",
            "description": "Ejemplo de API Rest"
        },
        {
            "name": "Subir archivos",
            "description": "Ejemplo upload de archivos, tanto localmente como también hacia S3 de AWS"
        },
        {
            "name": "Estado",
            "description": "API Rest Estado"
        },
        {
            "name": "Categorías",
            "description": "API Rest Categorías"
        },
        {
            "name": "Negocios",
            "description": "API Rest Negocios"
        },
        {
            "name": "Negocios logo",
            "description": "API Rest para administrar los logos de los negocios"
        },
        {
            "name": "Platos Categorías",
            "description": "API Rest Platos Categorías"
        },
        {
            "name": "Platos",
            "description": "API Rest Platos"
        }
    ]
)

#docker exec -it python_dev uvicorn main:app --host 0.0.0.0 --port 8050 --reload

#@app.get("/", status_code=status.HTTP_200_OK)
@app.get("/")
def index():
    print(os.getenv('AWS_REGION'))
    #return {"estado": "ok", "mensaje": "Fullstack FastAPI + SQLAlchemy + React + AWS"}
    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content={"estado": "ok", "mensaje": "Fullstack FastAPI + SQLAlchemy + React + AWS"},
    )


# Incluir el router
app.include_router(ejemplo_router)
app.include_router(upload_router)
app.include_router(estado_router)
app.include_router(categoria_router)
app.include_router(negocio_router)
app.include_router(negocio_logo_router)
app.include_router(platos_categoria_router)
app.include_router(platos_router)



#custom 404
@app.exception_handler(status.HTTP_404_NOT_FOUND)
async def custom_404_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=404,
        content={"estado": "error", "mensaje": "Ruta no encontrada"},
    )
#para métodos HTTP no usados {"detail": "Method Not Allowed"}
@app.exception_handler(StarletteHTTPException)
async def custom_405_handler(request: Request, exc: StarletteHTTPException):
    if exc.status_code == status.HTTP_405_METHOD_NOT_ALLOWED:
        return JSONResponse(
            status_code=status.HTTP_405_METHOD_NOT_ALLOWED,
            content={"estado": "error", "mensaje": "Método no permitido"},
        )
    # Para otras excepciones que puedan llegar aquí
    return JSONResponse(
        status_code=exc.status_code,
        content={"estado": "error", "mensaje": str(exc.detail)},
    )


#validaciones dto
@app.exception_handler(RequestValidationError)
async def manejar_errores_validacion(request: Request, exc: RequestValidationError):
    errores_personalizados = []

    for error in exc.errors():
        campo = error["loc"][-1]
        mensaje = error["msg"]

        # Procesar ValueError con ("campo", "mensaje")
        if mensaje.startswith("Value error,"):
            try:
                _, custom_msg = eval(error["input"])
                mensaje = custom_msg
            except:
                pass

        elif mensaje == "Input should be a valid integer":
            mensaje = f"El campo {campo} debe ser un número entero"

        elif mensaje == "Field required":
            mensaje = f"El campo {campo} es obligatorio"

        errores_personalizados.append({
            "campo": campo,
            "mensaje": mensaje
        })

    return JSONResponse(
        status_code=status.HTTP_400_BAD_REQUEST,
        content={
            "estado": "error",
            "mensaje": "Errores de validación",
            "errores": errores_personalizados
        },
    )