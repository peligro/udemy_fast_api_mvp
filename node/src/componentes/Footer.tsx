const Footer = () => { 
  return (
    <>
  <footer className="footer">
				<div className="container-fluid">
					<div className="row text-muted">
						<div className="col-12 text-center">
							<p className="mb-0">
								&copy; Todos los derechos reservados {new Date().getFullYear()}| Desarrollado por <a className="text-muted" href="https://www.cesarcancino.com" target="_blank" title='Web Master César Cancino'><strong>Web Master César Cancino</strong></a>
							</p>
						</div>
						
					</div>
				</div>
			</footer>
    </>
  )
}

export default Footer