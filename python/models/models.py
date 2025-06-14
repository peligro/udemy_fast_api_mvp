from sqlmodel import SQLModel, Field, Relationship
from typing import Optional
from datetime import datetime


class Estado(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    nombre: str
    # Relación inversa (opcional pero recomendada)
    usuarios: list["Usuario"] = Relationship(back_populates="estado")
    #negocios: list["Negocio"] = Relationship(back_populates="negocio")


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
    #negocios: list["Negocio"] = Relationship(back_populates="negocio")



class Categoria(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    nombre: str
    slug: str


"""
class Negocio(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    estado_id: int | None = Field(default=None, foreign_key="estado.id")
    estado: Optional[Estado] = Relationship(back_populates="usuarios")
    usuario_id: int | None = Field(default=None, foreign_key="usuario.id")
    usuario: Optional[Usuario] = Relationship(back_populates="negocios")
    nombre: str
    slug: str
    correo: str
    telefono: str
    logo: str
    direccion: str
    fecha: datetime = Field(default_factory=datetime.now)
"""    

"""
from sqlmodel import SQLModel, Field

class Estado(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    nombre: str
"""

