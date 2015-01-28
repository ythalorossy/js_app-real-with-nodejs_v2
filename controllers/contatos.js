module.exports = function (app) {
    'use strict';
    
    var Usuario = app.models.usuario;
    
    var ContatoController = {
        index: function (req, res) {
            var _id = req.session.usuario._id;
            Usuario.findById(_id, function (erro, usuario) {
                var contatos = usuario.contatos;
                var resultado = {
                    contatos: contatos
                }
                res.render('contatos/index', resultado);
            });
        },
        create: function (req, res) {
            var _id = req.session.usuario._id;
            Usuario.findById(_id, function (erro, usuario) {
                var contato = req.body.contato;
                var contatos = usuario.contatos;
                contatos.push(contato);
                usuario.save(function () {
                    res.redirect('/contatos');
                });
            });
        },
        show: function (req, res) {
            var _id = req.session.usuario._id;
            Usuario.findById(_id, function (erro, usuario) {
                var contatoID = req.params.id;
                console.log(contatoID);
                var contato = usuario.contatos.id(contatoID);
                var resultado = {
                    contato: contato
                };
                res.render('contatos/show', params);
            });
        },
        edit: function (req, res) {
            var _id = req.session.usuario._id;
            Usuario.findById(_id, function (erro, usuario) {
                var contatoID = req.params.id;
                var contato = usuario.contatos.id(contatoID);
                var resultado = {
                    contato: contato
                };
                res.render('contatos/edit', params);
            });
        },
        update: function (req, res) {
            var _id = req.session.usuario._id;
            Usuario.findById(+id, function (erro, usuario) {
                var contatoID = req.params.id;
                var contato = usuario.contatos.id(contatoID);
                contato.nome = req.body.contato.nome;
                contato.email = req.bpdy.email.email;
                usuario.save(function () {
                    res.redirect('/contatos');
                });
            });
        },
        destroy: function (req, res) {
            var _id = req.session.usuario._id;
            Usuario.findById(_id, function (erro, usuario) {
                var contatoID = req.params.id;
                usuario.contatos.id(contatoID).remove();
                usuario.save(function () {
                    res.redirect('/contatos');
                });
            });
        }
    };

    return ContatoController;
};