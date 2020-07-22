import File from "../Entities/File.js"
import Folder from "../Entities/Folder.js"
import {isFile} from "./helper.js"

class ExplorerModel {
    constructor() {
        this.root = {
            // src: {
            //     components: {
            //         addons: {},
            //         admin: {},
            //         block: {
            //             'index.js': true
            //         }
            //     },
            //     containers: {},
            //     layouts: {},
            //     services: {},
            //     'app.js': true,
            //     'app.css': true
            // },
            // public: {
            //     img: {}
            // },
            // node_modules: {},
            // 'package.json': true,
            // '.env': true

        };
        this.active = this.root
    }

    onCreate = (name, type) => {
        if (isFile(this.active)) {
            this.active = this.active.parent
        }
        if (type === "file") {
            this.active[name] = new File(name, this.active);

        } else if (type === "folder") {
            this.active[name] = new Folder(name, this.active)
        }

        this.renderExplorer()
        console.log(this.root)
    }

    setActiveElement(path) {
        //path [file]
        this.active = this.root[path[0]]
    }

    bindRenderExplorer(cb) {
        this.renderExplorer = cb
    }
}

export default ExplorerModel