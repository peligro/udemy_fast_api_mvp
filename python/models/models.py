from sqlmodel import SQLModel, Field, Relationship
from typing import Optional
from datetime import datetime


class Estado(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    nombre: str

    # Relaciones inversas
    usuarios: list["Usuario"] = Relationship(back_populates="estado")
    negocios: list["Negocio"] = Relationship(back_populates="estado")


class Usuario(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)

    # Clave foránea hacia Estado
    estado_id: int | None = Field(default=None, foreign_key="estado.id")
    
    # Relación con Estado
    estado: Optional[Estado] = Relationship(back_populates="usuarios")

    nombre: str
    correo: str
    telefono: str
    password: str
    token: str
    fecha: datetime = Field(default_factory=datetime.now)

    # Relación inversa con Negocio
    negocios: list["Negocio"] = Relationship(back_populates="usuario")


class Categoria(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    nombre: str
    slug: str

    # Relación inversa con Negocio
    negocios: list["Negocio"] = Relationship(back_populates="categoria")


class Negocio(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)

    # Clave foránea hacia Estado
    estado_id: int | None = Field(default=None, foreign_key="estado.id")
    estado: Optional[Estado] = Relationship(back_populates="negocios")  # ✅ Apunta a Estado.negocios

    # Clave foránea hacia Usuario
    usuario_id: int | None = Field(default=None, foreign_key="usuario.id")
    usuario: Optional[Usuario] = Relationship(back_populates="negocios")  # ✅ Apunta a Usuario.negocios

    # Clave foránea hacia Categoria
    categoria_id: int | None = Field(default=None, foreign_key="categoria.id")
    categoria: Optional[Categoria] = Relationship(back_populates="negocios")  # ✅ Apunta a Categoria.negocios

    # Campos normales
    nombre: str = Field(max_length=100)
    slug: str = Field(max_length=100)
    correo: str = Field(max_length=100)
    telefono: str = Field(max_length=50)
    direccion: str = Field(max_length=100)
    logo: str
    facebook: str = Field(default="", max_length=100)
    instagram: str = Field(default="", max_length=100)
    twitter: str = Field(default="", max_length=100)
    tiktok: str = Field(default="", max_length=100)
    mapa: str
    descripcion: str
    fecha: datetime = Field(default_factory=datetime.now)
 


"""
from sqlmodel import SQLModel, Field

class Estado(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    nombre: str
"""

