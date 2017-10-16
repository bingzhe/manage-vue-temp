export default class TreeStore {
    constructor(options) {
        for (let option in options) {
            if (options.hasOwnProperty(option)) {
                this[option] = options[option];
            }
        }

        this.datas = new Map();

        const _traverseNodes = (root) => {
            for (let node of root) {
                this.datas.set(node.key, node);

                if (node.list && node.list.length > 0) {
                    _traverseNodes(node.list);
                }
            }
        };

        _traverseNodes(this.root);
    }

    getNode(key) {
        return this.datas.get(key);
    }

    setNode(node) {
        this.datas.set(node.key, node);
    }


}