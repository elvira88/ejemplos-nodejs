function gestionaRespuesta(datos){
    if(datos.error){
        console.log("Hay un error: "+datos.message);
    }else{
        $.each(datos,function(i,item){
            $("#tabla tbody").append("<tr scope='row'><td class=''><a href='/api/show/"+item._id+"'>"+item.nombreYApellidos+" (show/id)</a><br/><a href='/api/get/"+item._id+"'>(get/id)</a></td><td class='text-center'><a href='/api/show/"+item._id+"' class='btn btn-primary'>Show</a><a href='/api/edita/"+item._id+"' class='btn btn-warning'>Edit</a><a href='/api/borra/"+item._id+"' class='btn btn-danger'>Delete</a></td></tr>")
        });
        $('#tabla').DataTable();    
    }
    
}
function init(){
    console.log("DOM Cargado");
    var listado=$("body").has("#tabla");
    //console.log(listado);
    if(listado.length){
        $.getJSON("getAll",gestionaRespuesta)
        .fail(function(){
            console.log("error");
        });
    }
}
$(document).ready(init);