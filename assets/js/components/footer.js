// footer.js - Componente de Footer
export class Footer {
  constructor() {
    this.container = document.getElementById("footer-container");
  }

  render() {
    this.container.innerHTML = this.getTemplate();
    this.initEventListeners();
  }

  getTemplate() {
    return `
            <footer class="footer">
                <div class="container">
                    <div class="footer-grid">
                        <div class="footer-column">
                            <h3>Vida Verde</h3>
                            <p>Preservando o patrimônio natural de Minas Gerais desde 2005.</p>
                            <div class="social-links">
                                <a href="#" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
                                <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                                <a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
                                <a href="#" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
                            </div>
                        </div>
                        
                        <div class="footer-column">
                            <h3>Links Rápidos</h3>
                            <ul class="footer-links">
                                <li><a href="/" data-spa>Página Inicial</a></li>
                                <li><a href="/projetos" data-spa>Projetos Sociais</a></li>
                                <li><a href="/cadastro" data-spa>Cadastro</a></li>
                                <li><a href="/contato" data-spa>Contato</a></li>
                            </ul>
                        </div>
                        
                        <div class="footer-column">
                            <h3>Projetos</h3>
                            <ul class="footer-links">
                                <li><a href="/projetos#nascentes" data-spa>Nascentes Vivas</a></li>
                                <li><a href="/projetos#cerrado" data-spa>Cerrado em Pé</a></li>
                                <li><a href="/projetos#mata-atlantica" data-spa>Mata Atlântica</a></li>
                            </ul>
                        </div>
                        
                        <div class="footer-column">
                            <h3>Transparência</h3>
                            <ul class="footer-links">
                                <li><a href="#" data-spa>Relatórios Anuais</a></li>
                                <li><a href="#" data-spa>Prestação de Contas</a></li>
                                <li><a href="#" data-spa>Certificações</a></li>
                            </ul>
                        </div>
                    </div>
                    
                    <div class="footer-bottom">
                        <p>&copy; 2024 Vida Verde - Todos os direitos reservados</p>
                        <p>Desenvolvido por Fábio Lopes de Andrade</p>
                    </div>
                </div>
            </footer>
        `;
  }

  initEventListeners() {
    // Aqui podem ser adicionados event listeners específicos do footer
  }
}
