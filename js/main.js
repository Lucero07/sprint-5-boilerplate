var api = {
  url : "http://examen-laboratoria-sprint-5.herokuapp.com/topics",
};
var $temasForo = $("#accordion");

var cargarPagina = function () {
  listarTemas();
  $('.collapse').collapse();
  $("#add-form").submit(crearTema);
  $("#buscar").keyup(imprimirFiltrado);
};

var listarTemas = function () {
  $.getJSON(api.url,function (temas) {
    temas.forEach(imprimirTema);
  });
};


 var imprimirTema = function(tema) {
   var autor = tema.author_name;
   var contenido = tema.content;
   var identificador =tema.id;
   var cabezera = "cabezera"+identificador;
   var plantillaTema = estructuraHtml.replace("__autor-tema__", autor).replace("__contenido-tema__",contenido).replace(/__id__/g,identificador).replace(/__cabezera__/g,cabezera);
  $temasForo.append(plantillaTema);
 };

 var filtarTemas = function (e) {
   e.preventDefault();
   var temaBuscar = $("#buscar").val().toLowerCase();
   var temaEncontrado = $("#temas-Actuales").filter(function(temaFiltro){
     return temaFiltro.author_name.toLowerCase().indexOf(elemento) >= 0;
     console.log(temaFiltro.author_name);
   });
   imprimirFiltrado(temaEncontrado);
   console.log(temaEncontrado);

 };

 var imprimirFiltrado = function(temas) {
   var todosLosTemas="";
   console.log(temas);
   (function(tema){
     todosLosTemas+= estructuraHtml.replace("__autor-tema__", autor).replace("__contenido-tema__",contenido).replace(/__id__/g,identificador).replace(/__cabezera__/g,cabezera);
    $temasForo.append(plantillaTema);
   }
 );
  $("#accordion").html(todosLosTemas);
    };




 // var estructuraHtml = '<tr data-clave="__id__">' +
 //                    '<td>__autor-tema__</td>' +
 //                    '<td>__contenido-tema__</td>' +
 //                    ' <td>'+
 //                      '<button class="glyphicon glyphicon-open info" data-toggle="modal" data-target="#modalInfo" > </button>' +" "+
 //                      '<button class="glyphicon glyphicon-pencil"> </button>' + " "+
 //                      '<button class="glyphicon glyphicon-trash borrar"> </button>' +
 //                    '</td>'+
 //                  '</tr>';


var estructuraHtml ='<div class="panel panel-default">' +
                      '<div class="panel-heading row" role="tab" id="__cabezera__">' +
                          '<h4 class="panel-title col-xs-8">' +
                              '<a role="button" data-toggle="collapse" data-parent="#accordion" href="#__id__" aria-expanded="false" aria-controls="__id__">__autor-tema__</a>'+
                          '</h4>' +
                        '<button  type="button" class="btn btn-primary btn-sm glyphicon glyphicon-open info" data-toggle="modal" data-target="#mymodal" > </button>' +" "+
                       '<button class="btn btn-primary btn-sm glyphicon glyphicon-pencil"> </button>' + " "+
                       '<button class="btn btn-primary btn-sm glyphicon glyphicon-trash borrar"> </button>' + '<button class="btn btn-primary glyphicon glyphicon-option-horizontal btn-sm" type="button">'+ ' '+'<span class="badge">'+'4'+'</span>'+'</button>'+
                      '</div>' +
                      '<div id="__id__" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="__cabezera__">' +
                        '<div class="panel-body"><strong>Contenido: </strong>__contenido-tema__</div>' +
                        '<div class="panel-body"><strong>Id: </strong>__id__</div>'+
                      '</div>' +
                    '</div>';

  var crearTema = function (e) {
    e.preventDefault();
    var autor = $("#autor").val();
    var contenido = $("#contenido").val();

      $.post(api.url, {
        author_name: autor,
        content: contenido,

      }, function (tema) {
        imprimirTema(tema);
        $("#myModal").modal("hide");

      });
    };


 $(document).ready(cargarPagina);
