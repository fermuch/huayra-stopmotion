var app = angular.module('app');

var fs = require('fs');

app.service('Preferencias', function() {
    this.ruta = process.env.HOME + '/.huayra-motion';
    this.data = null;

    this.abrir = function (){
        var self = this;

        if (fs.existsSync(self.ruta)) {
            var tmp_data = fs.readFileSync(self.ruta);
            self.data = JSON.parse(tmp_data);
        }
        else {
            self.data = {proyectos_recientes: []};
            self.guardar();
        }
    }

    this.guardar = function (){
        var self = this;
        fs.writeFileSync(this.ruta, angular.toJson(self.data));
    }

    this.agregar_proyecto_reciente = function (ruta){
        var indice = 0;

        this.data.proyectos_recientes.map(function (element, index) {
            if (element.indice > indice) { indice = element.indice; }
        });

        for (var index in this.data.proyectos_recientes){
            if (this.data.proyectos_recientes[index].ruta == ruta) {
                this.data.proyectos_recientes.splice(index, 1);
                break;
            }
        }

        this.data.proyectos_recientes.push({indice: indice + 1, ruta: ruta});
        this.guardar();
    }

    // "constructor"
    this.abrir();
});
