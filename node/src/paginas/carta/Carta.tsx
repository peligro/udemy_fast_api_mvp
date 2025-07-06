import { useLoaderData, type LoaderFunction } from "react-router-dom";
import type { CartaMenuInterface, LoaderParams } from "../../interfaces/Interfaces";
import { getDatosPorSlug } from "../../servicios/CartaService";

export const loader: LoaderFunction = async ({ params }) => {
    // Convierte params a unknown primero y luego a LoaderParams
    const typedParams = params as unknown as LoaderParams;
    const datos: CartaMenuInterface = await getDatosPorSlug(typedParams.slug);
    return [datos];
};

const Carta = () => {
    const [datos] = useLoaderData() as [CartaMenuInterface];
    const categorias = Array.from(new Set(datos.platos.map(plato => plato.platoscategoria)));

    return (
        <section id="menu" className="menu section-bg">
            <div className="container">
                <div className="section-title text-center">
                    <img
                        src={datos.logo}
                        alt={datos.nombre}
                        className="img-fluid mb-3"
                        style={{
                            maxWidth: '200px',
                            height: 'auto',
                            borderRadius: '8px'
                        }}
                    />
                    <h2>{datos.nombre}</h2>
                    <p>{datos.descripcion}</p>
                </div>

                <div className="row">
                    <div className="col-lg-12 d-flex justify-content-center">
                        <ul className="nav nav-tabs mb-5">
                            {categorias.map((categoria, index) => (
                                <li className="nav-item" key={index}>
                                    <a className="nav-link" data-bs-toggle="tab" href={`#categoria-${index + 1}`} title={categoria}>
                                        {categoria}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-12">
                        <div className="tab-content">
                            {categorias.map((categoria, index) => (
                                <div id={`categoria-${index + 1}`} className={`tab-pane fade ${index === 0 ? 'show active' : ''}`} key={index}>
                                    <div className="row gy-5">
                                        {datos.platos
                                            .filter(plato => plato.platoscategoria === categoria)
                                            .map(plato => (
                                                <div className="col-lg-6 menu-item" key={plato.id}>
                                                    <div className="d-flex">
                                                        <div className="menu-img flex-shrink-0 me-4">
                                                            <img
                                                                src={plato.foto}
                                                                alt={plato.nombre}
                                                                className="img-fluid"
                                                                style={{
                                                                    width: '100px',
                                                                    height: '100px',
                                                                    objectFit: 'cover',
                                                                    borderRadius: '8px'
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="flex-grow-1">
                                                            <div className="d-flex justify-content-between align-items-start">
                                                                <h4>{plato.nombre}</h4>
                                                                <div className="price text-end">
                                                                    ${plato.precio}
                                                                </div>
                                                            </div>
                                                            <p className="ingredients">
                                                                {plato.ingredientes}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Carta;