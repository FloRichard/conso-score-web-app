export default function Navbar(){
    return <nav class="navbar navbar-expand-lg ">
    <a class="navbar-brand" href="#"><img src="../src/assets/Logo_du_Gouv.svg" width="100%" height="150" alt=""></img></a>
  
    <div class="collapse navbar-collapse" id="navbarScroll">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item">
                <a class="btn btn-primary" href="/login">Se connecter</a>
            </li>
            <li class="nav-item">
                <a class="btn btn-success" href="/register">Créer un compte</a>
            </li>
        </ul>
    </div>

  </nav>
}