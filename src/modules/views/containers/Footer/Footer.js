class $Footer {
    constructor(){
        this.element = document.createElement("footer");
        this.element.className = "footer";

        this.element.appendChild(this.createLinks());
        this.element.appendChild(this.createCopyright());


        // <i class="fab fa-github"></i>
    }

    createLinks () {
        const div = document.createElement("div");
        div.className = "link__info-wrapper";

        const a_github = document.createElement("a");
        a_github.className = "link__info";
        a_github.href = "https://github.com/seong7/recipe-app-2.0";
        a_github.target = "_blank";
        
        a_github.innerHTML = `
            <i class="fab fa-github"></i>
        `;
        
        const a_v1 = document.createElement("a");
        a_v1.className = "link__info";
        a_v1.href = "https://seongjin-recipe.netlify.app";
        a_v1.target = "_blank";
        a_v1.innerHTML = `
            <span>(v1.0 바로가기)</span>
        `

        div.appendChild(a_github);
        div.appendChild(a_v1);
        return div;
    }

    createCopyright(){
        const copyright = document.createElement("div");
        copyright.className = "copyright";

        copyright.innerHTML = `
            <div class="copyright">
                <span>&copy; by Seongjin Kim & Jonas Schmedtmann. Powered by
                <a href="http://food2fork.com" target="_blank" class="link">Food2Fork.com</a></span>.
            </div>
        `
        return copyright;
    }

    render(target) {
        target.appendChild(this.element)
      }
}

export const Footer = new $Footer();