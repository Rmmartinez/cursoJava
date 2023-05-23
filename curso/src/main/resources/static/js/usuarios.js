// Call the dataTables jQuery plugin
//se ejecuta el código una vez que ya cargó la página
$(document).ready(function() {
	cargarUsuarios();
  $('#usuarios').DataTable();
  
  actualizarEmailUsuario();
});

function actualizarEmailUsuario(){
	document.getElementById('txt-email-usuario').outerHTML = localStorage.email;
}

async function cargarUsuarios(){
  const request = await fetch('api/usuarios', {
    method: 'GET',
    headers: getHeaders()
  });
  const usuarios = await request.json();
  
  let listaHtml = '';
  for(let usuario of usuarios){
	  let usuarioHtml = '<tr><td>'+usuario.id+'</td><td>'
	  				  +usuario.nombre+' '+usuario.apellido+'</td><td>'
	  				  +usuario.email+'</td><td>'+usuario.telefono+
	  				  '</td><td><a href="#" onclick="eliminarUsuario('+usuario.id+')" class="btn btn-danger btn-circle btn-sm"><i class="fas fa-trash"></i></a></td></tr>';
		
	  listaHtml+= usuarioHtml;
  }

  document.querySelector('#usuarios tbody').outerHTML = listaHtml;
}

function getHeaders(){
	return{
		 'Accept': 'application/json',
      	 'Content-Type': 'application/json',
      	 'Authorization': localStorage.token
	};
}

async function eliminarUsuario(id){
	if(!confirm('¿Desea eliminar el usuario '+id+'?')){
		return;
	}
	const request = await fetch('api/usuarios/'+id, {
    method: 'DELETE',
    headers: getHeaders()
  });
  location.reload();
}

