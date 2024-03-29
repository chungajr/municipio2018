

var contrato = false;
var ID_DEPENDENCIA=0;

/* Carga inicial del los metodos utilizados */
$(document).ready(function(){
	var options = { 
	        beforeSubmit:  showRequest,  
	        success:       showResponse, 
	        url:       '_subirArchivoAnexoOP.action',
	        type:      'post', 
	        dataType:  'json'
	    }; 
		
		$('#frmDoc').submit(function(){
	    	$('#CveOrdenOP').val($('#id_orden').val());
			$(this).ajaxSubmit(options);
			return false;
		});
	/*INICIALIZACION DE BOTONES CAPTURA DE OP*/
	$('#btnNuevaOp').on('click', function(){
		nuevaOp();
		limpiarForma();
	});
	$('#cmdregresar').on('click', function(){
		regresar();
	});
	$('#btnGrabar').on('click', function(){
		guardar();
	});
	
	$('#fecha').datetimepicker({
		format: 'DD/MM/YYYY',
		defaultDate: new Date()
	});
	$('#xTipo').on('change', function(){
		cambiarModoDetalle();
	});
	$('#importeRetencion').on('click', function(){
		swal('La retención debe capturarse desde el devengado, cancele y recapture....');
	});
	importeRetencion
	$('.selectpicker').selectpicker();

	//$(elemento).val() --Obtener el valor del elemento
	//$(elemento).val(valor); -- Asignar el del elemento
	
	$('#tabsOrdenesEnca').hide();
	llenarTablaDeOrdenes();

	if(($('#cve_op').val()!=''||$('#cve_op').val()!='0')&&($('#accion').val()=='edit')){
		//alert('accion: ' +($('#accion').val()=='edit') );
		mostrarOrdenPago($('#cve_op').val());  
	  }
	 $('#BorraOs2').click(function(event){guardarAnexos();});

		
	  //$('#importeRetencion').click(function (){
		//  alert('La retencion debe ser capturada desde el devengado, favor de cancelar y volver a capturar el devengado');
	  //});	
	$('#cmdNuevaRetencion').click(function(event){limpiarRetenciones();});
	$('#cmdNuevoAnexo').click(function(event){limpiarAnexos();});
	$('#tabsOrdenesEnca').hide();
	$('#img_vale').click(function(event){muestraVales();});
	$('#tipoMovDoc').change(function(event){
		  if($(this).val()=='XML')
		  	$('#div_archivo').html('<input type="file" class="input-file" id="archivo" name="archivo" style="width:445px" accept="text/xml" />');
		  else if($(this).val()!='VAR')
		  	$('#div_archivo').html('<input type="file" class="input-file" id="archivo" name="archivo" style="width:445px" accept="application/pdf"/>');
		  else
		   $('#div_archivo').html('<input type="file" class="input-file" id="archivo" name="archivo" style="width:445px">');
		});
	

	
	
});

//---------------------------- Clase para agregar los anexos a la orden de pago -------------------------------------
function guardarAnexos(){
	
	var file = $("#archivo").val();
	if(file=="")
		guardarDocumento();
	else
		{
			$('#CveOrdenOP').val($('#cve_op').val());
			$('#frmDoc').submit();
		}
		
}

function limpiarAnexos(){
	$('#idDocumento').val('0');
	$('#tipoMovDoc').val(0);	
	$('#numeroDoc').val('');
	$('#notaDoc').val('');
	$('#tipoMovDoc').focus();
	$('#archivo').val("");
}
//---------------------------------------------------------- Guarda los anexos de las ordenes de pago ------------------------------------------------------------------
function subirArchivo(){
	ShowDelay('Guardando anexo','');
	$('#forma').submit();
}

function showRequest(formData, jqForm, options) { 
   return true; 
} 

function showResponse(data)  { 
	
	if(data.mensaje){
		CloseDelay("Anexo guardado con éxito");
		llenarTablaDeDocumentos();
		limpiarAnexos();
		$('#archivo').val('');
	}
	else{
		_closeDelay();
		jError("No se ha podido cargar el archivo, consulte a su administrador", "Error");
	}
} 


//------------------------------- Viene de la llamada de la clase guardarAnexos para escribir los anexos de la orden de pago ---------------------------------------------
function guardarDocumento(){
	 var error="";  
   if ($('#tipoMovDoc').selectpicker('val')=="") { 
	   swal({
	      	  title: 'Error!',
	      	  text: 'El tipo de documento no es válido',
	      	  type: 'error',
	      	  confirmButtonText: 'Cool'
	      	});return false;}
	     
   if ($('#numeroDoc').val()=="") {
	   swal({
	      	  title: 'Error!',
	      	  text: 'El número de documento no es válido',
	      	  type: 'error',
	      	  confirmButtonText: 'Cool'
	      	});
   return false;}

	  var idOrden=$('#id_orden').val();
						
						//ShowDelay('Guardando anexo','');
						controladorOrdenPagoRemoto.guardarDocumento($('#idDocumento').val(),$('#tipoMovDoc').selectpicker('val'),$('#numeroDoc').val(),$('#notaDoc').val(),idOrden,{
						callback:function(items) { 	 
							llenarTablaDeDocumentos();
							lipiarDocumento();	    
						 //CloseDelay("Anexos guardados con Ã©xito");	  
						} 					   				
						,
						errorHandler:function(errorString, exception) { 
							swal(errorString, 'Error');         
						}
	 }); 
}

function regresar(){
    $('#tabsOrdenesEnca').hide(); 
	$('#listaOrdenesPendientes').show();	
	$('#DivOPResults').show();
	limpiarForma();
	llenarTablaDeOrdenes();
 }

//------------------------ Carga el listado de las facturas que se agregan en el movimiento de la orden de pago ------------------------
function getFacturas(){
	
	var idDependencia = $('#cbUnidad').val();
	var idRecurso = $('#tipoGasto').selectpicker('val');
	//alert('Dependencia: ' + idDependencia +'-----------'+ 'Recurso: ' + idRecurso);
	/*if(idDependencia==0||idDependencia=="") {//jAlert('Es necesario seleccionar la Unidad Administrativa para listar las facturas');
		swal({
      	  title: 'Error!',
      	  text: 'Es necesario seleccionar la Unidad Administrativa para listar las facturas',
      	  type: 'error',
      	  confirmButtonText: 'Cool'
      	})
	return false;}*/
	
	//if(typeof(idDependencia)=='undefined') idDependencia =0;
	/*
	jWindow('<iframe width="800" height="400" name="FAC" id="FAC" frameborder="0" src="../../sam/consultas/muestra_facturas.action?tipoGasto='+$('#tipoGasto').attr('value')+'&unidad='+idDependencia+'&clv_benefi='+$('#xClaveBen').attr('value')+'"></iframe>','Facturas disponibles', '','Cerrar',1);
	*/
	//int idRecurso, int idDependencia, String clv_benefi, int cve_pers
	swal({
		  title: 'Facturas disponibles',
		  text: 'Seleccione la factura que desea comprobar',
		  html:
			  '<iframe width="800" height="400" name="FAC" id="FAC" frameborder="0" src="../../sam/consultas/muestra_facturas.action?tipoGasto='+idRecurso+'&unidad='+idDependencia+'&clv_benefi='+$('#xBeneficiario').selectpicker('val')+'"></iframe>',
		  width: 800,
		  padding: 10,
		  animation: false
		})
}


/*----------------- Limpia la tabla desde el boton Nuevo anexo en la Orden de pago */
function lipiarVale (){
	$('#idVale').val('');
	$('#importeVale').val('');
	$('#claveVale').val('');
	$('#importeAntVale').val('0');	
	$('#proyectoCuenta').selectpicker('refresh');
	dwr.util.removeAllOptions("claveValeDis");
	$('#textImporteDisponible').text("");	 
 }
 
/*----------------------------- Clase que muestra los vales en las ordenes de pago ------------------------------------------------------------------*/
function getValeDocumento(idVale, num_vale, disponible, comprobado){
	$('#CVE_VALE').val(idVale);
	$('#txtvale').val(num_vale);
	$('#txtdisponiblevale').val(formatNumber(parseFloat(disponible),'$'));
	$('#txtcomprobadovale').val(formatNumber(parseFloat(comprobado),'$'));
	_closeDelay();
}
function pintaVales( table, consecutivo,idproyecto, proyecto,partida,vale,numeroVale,importe, imp_anterior, imp_pendiente, idVale){
	
	var tabla = document.getElementById( table ).tBodies[0];
	var row =   document.createElement( "TR" );  
	var htmlEdit = "<img src=\"../../imagenes/page_white_edit.png\" style='cursor: pointer;' alt=\"Editar registro\" width=\"16\" height=\"16\" border=\"0\" onClick='editarVale("+idVale+","+vale+","+importe+",\""+proyecto+"-"+partida+"\")' >"; 	
	var htmlCheck = "<input type='checkbox' name='clavesVales' id='clavesVales' value='"+idVale+"' >";
	row.appendChild( Td("","","",htmlCheck));
	row.appendChild( Td(proyecto,centro));
	row.appendChild( Td(partida,centro));
	row.appendChild( Td(numeroVale,centro));
	row.appendChild( Td(formatNumber(importe,"$"),derecha) );
	row.appendChild( Td(formatNumber(imp_anterior,"$"),derecha) );
	row.appendChild( Td(formatNumber(imp_pendiente,"$"),derecha) );
	row.appendChild( Td("","centro","",htmlEdit) );
	tabla.appendChild(row);
}

function editarVale(idVale,vale,importe,proyectoCuenta){
	$('#idVale').val(idVale);
	$('#proyectoCuenta').val(proyectoCuenta);
	$('#importeVale').val(importe);	
	$('#importeAntVale').val(importe);	
	cargarVales(vale);
	
} 


function guardarVale(){
	var error="";  
   if ($('#proyectoCuenta').attr('value')==0) {swal('El Proyecto/Cuenta no es válido'); return false;}
   if ($('#claveValeDis').attr('value')==""||$('#claveValeDis').attr('value')==0) {swal('El Vale no es válido'); return false;}
   if ($('#importeVale').attr('value')=="" || parseFloat($('#importeVale').attr('value')==0)) {swal('El importe escrito para la comprobaciÃ³n no es vÃ¡lido'); return false;}
	
	var temp = $('#claveValeDis :selected').text().replace(',','');
		temp = temp.replace('$','');
		temp = temp.replace(' ','');
   var datos= temp.split('-');	 
   var textImporteDisponible = parseFloat((datos[1]).replace(',',''));
	var imp_anterior = parseFloat($('#importeAntVale').val());
	var imp_vale = parseFloat($('#importeVale').val());
	var imp_total_disp_vale = parseFloat(textImporteDisponible+imp_anterior);
	//alert("Imp. Vale: "+imp_vale+"\nDisponible: "+textImporteDisponible+"\nDis. Anterior: "+imp_anterior+"\Disponible total Vale: "+imp_total_disp_vale);
	if (imp_vale>(imp_total_disp_vale)) {swal('El importe de comprobación para el Vale no puede ser mayor al disponible actual del Vale'); return false;}
	  datos= $('#proyectoCuenta :selected').text().split('-');	 
	  var proyecto = $('#proyectoCuenta').val();
	  var partida = datos[1];	 	 
	  var idOrden=$('#id_orden').val();
	  /*jConfirm('Â¿Confirma que desea guardar la comprobacion de Vale para la Orden de Pago?','Guardar Vale', function(r){
			if(r){*/
				  ShowDelay('Guardando vale','');
				  controladorOrdenPagoRemoto.guardarVale( $('#idVale').val(),$('#claveValeDis').val(),$('#importeVale').val(),textImporteDisponible,idOrden,proyecto,partida,$('#importeAntVale').val(), {
				  callback:function(items) { 	
				  if(items==""){
					  	llenarTablaDeVales();
						lipiarVale();
						CloseDelay("Vale guardado con éxito");	 
				  }
				   else{
					   swal(items,'Error');
				   }
				  
				} 					   				
				,
				errorHandler:function(errorString, exception) { 
					swal(errorString, 'Error'); 
			}
		});
	     
   //}
	//},async=false );
}

function eliminarVales(){
	  var checkVales = [];
    $('input[name=clavesVales]:checked').each(function() { checkVales.push($(this).val());	 });	 
	 if (checkVales.length > 0 ) {
	  	 var idOrden=$('#id_orden').val();
	  	
	  	swal({
	  	  title: 'Esta seguro?',
	  	  text: "No podra revertir los cambios!",
	  	  type: 'warning',
	  	  showCancelButton: true,
	  	  confirmButtonColor: '#3085d6',
	  	  cancelButtonColor: '#d33',
	  	  confirmButtonText: 'Si, Borrar!'
	  	}).then(function (r) {
	  		swal.showLoading();
			controladorOrdenPagoRemoto.eliminarVales(checkVales, idOrden, {
			callback:function(items) {	
				llenarTablaDeVales();
			} 					   				
			,
			errorHandler:function(errorString, exception) { 
				swal('Oops...',errorString,'error');	
			}
		},async=false ); 
			swal({
				  title: 'Confirmacion',
				  text: 'El vale se elimino correctamente!..',
				  timer: 2000,
				  onOpen: function () {
				    swal.showLoading()
				  }
				}).then(
				  function () {},
				  // handling the promise rejection
				  function (dismiss) {
				    if (dismiss === 'timer') {
				      console.log('I was closed by the timer')
				    }
				  }
				)
	  	})
	 } else 
	    swal('Oops...','Es necesario que seleccione un elemento de la lista','warning');
}

 
function cargarVales(vale) {
	
	
	var x = document.getElementById("proyectoCuenta").value;
    document.getElementById("demo").innerHTML = "You selected: " + x;
    dwr.util.removeAllOptions("claveValeDis");
    var datos= $('#proyectoCuenta :selected').text().split('-');	 
	 var proyecto = $('#proyectoCuenta').val();//datos[0];
	 var partida = datos[1];
	 controladorOrdenPagoRemoto.getValesDisponibles(proyecto,partida, {
		   callback:function(items) { 				
				dwr.util.addOptions('claveValeDis',{ 0:'[Seleccione]'});
				dwr.util.addOptions('claveValeDis',items,"CVE_VALE", "DATOVALE");
				$('#claveValeDis').val(vale);
		   } 					   				
	       ,
	       errorHandler:function(errorString, exception) { 
		   	  swal('Oops 11...','Fallo la operacion:<br>Error:: ' + errorString + '-message:: ' + exception.message + '-JavaClass:: ' + exception.javaClassName + '.<br>Consulte a su administrador','warning');
	       }
	},async=false );
    
}

/*-------------------------------------------------- Terminan las clases de lso Vales ---------------------------------------------------------*/



/*--------- Eliminar los detalles de la Orden de pago si esta se encuentra en edicion procede a eliminar todos los detalles cargados desde la factura --------*/
function eliminarDetalle(){
	  var checkDetalles = [];
	  $('input[name=clavesDetalles]:checked').each(function() {  checkDetalles.push($(this).val());	 });	 
	  if (checkDetalles.length > 0 ) {
		  var idOrden=$('#id_orden').val();
		  swal({
			  	title: 'Esta seguro?',
			  	text: "No podra revertir los cambios!",
			  	type: 'warning',
			  	showCancelButton: true,
			  	confirmButtonColor: '#3085d6',
			  	cancelButtonColor: '#d33',
			  	confirmButtonText: 'Si, Borrar!'
			  	}).then(function (r) {
				  	if(r){
							controladorOrdenPagoRemoto.eliminarDetalle(checkDetalles,idOrden, {
							callback:function(items) { 		
								   if (items==true) {
									   //$('#CVE_CONTRATO').val(0);
									   limpiarDetalle();
									   limpiarRetenciones();
									   limpiarAnexos();
									   lipiarVale();
									   llenarTablaDeDetallesOrdenes();	
									   
									   CloseDelay("Se eliminaron satisfactoriamente los detalles");
								   }
								   else
									   swal('Oops...','No se han podido eliminar los movimientos de la Orden de Pago, es posible que sean erroneos','error'); 
							} 					   				
							,
							errorHandler:function(errorString, exception) { 
								swal('Oops...',errorString,'error') 
							}
						},async=false ); 
					}
		  	})
	   
	 } else 
		 swal('Oops...','Es necesario que seleccione un elemento de la lista','info'); 
	   
}


function lipiarDocumento(){
	$('#idDocumento').attr('value',"");
	$('#numeroDoc').attr('value',"");
	$('#notaDoc').attr('value',"");
}

function limpiarRetenciones(){
	$('#idRetencion').attr('value', '');
	$('#retencion').val(0);	
	$('#importeRetencion').attr('value','');
	$('#retencion').focus();
}

/*-------------------------- ESTA CLASE ES INUSUAL DADO QUE TODA LA INFORMACION PRESUPUESTAL VIENE DESDE LA FACTURA ------------------------------------------------*/
function limpiarDetalle() {
	$('#ID_PROYECTO').val(0);
	$('#txtproyecto').val('');
    $('#txtpartida').val('');	
    $('#notaDetalle').val('');
	$('#importeDetalle').val('');
	$('#id_ordenDetalle').val('');
	$('#txtproyecto').prop('disabled',false);
    $('#txtpartida').prop('disabled',false);
	$('#txtpresupuesto').val('');							  
	$('#txtdisponible').val('');
	//$('#txtdisponiblevale').attr('value', '');
	//$('#txtcomprobadovale').attr('value', '');
	if ($('#xTipo').selectpicker('val')!=0 && $('#xTipo').selectpicker('val')!=2)
  	    $('#img_presupuesto').show();
 } 
/*------------- Eliminar documentos de los anexos de la orden de pago ----------------------------------*/
function eliminarDocumentos(){
	 var checkDocumentos = [];
     $('input[name=clavesDocumentos]:checked').each(function() {  checkDocumentos.push($(this).val());	 });	 
	 if (checkDocumentos.length > 0 ) {
	 	var idOrden=$('#id_orden').val();
	 	//var idOrden=$('#cve_orden').val();
	 	swal({
			  title: 'Eliminar anexos!',
			  text: '¿Confirma que desea eliminar los anexos?',
			  type: 'warning',
			  showCancelButton: true,
			  confirmButtonColor: '#3085d6',
			  cancelButtonColor: '#d33',
			  confirmButtonText: 'Si, Borrar!'
			}).then(function (r) {
				if(r){
					swal.showLoading();
					controladorOrdenPagoRemoto.eliminarDocumentos(checkDocumentos,idOrden, {
					callback:function(items) { 	
						llenarTablaDeDocumentos();	
					   //CloseDelay("Anexos eliminados con Ã©xito");
					} 					   				
					,
					errorHandler:function(errorString, exception) { 
						//jError(errorString, 'Error');  
						swal('Oops...',errorString,'error');
					}
				},async=false ); 
			
			}
				swal({
					  title: 'Confirmacion',
					  text: 'El anexo se elimino correctamente!..',
					  timer: 3000,
					  onOpen: function () {
					    swal.showLoading()
					  }
					}).then(
					  function () {},
					  // handling the promise rejection
					  function (dismiss) {
					    if (dismiss === 'timer') {
					      console.log('I was closed by the timer')
					    }
					  }
					)
			})
		
   
	 } else 
	    //jAlert("Es necesario seleccionar almenos un elemento de la lista");
	 	swal('Oops...','Es necesario seleccionar almenos un elemento de la lista','error');
}


//Obtener la fecha actual
function obtiene_fecha() {

	var fecha_actual = new Date()

	var dia = fecha_actual.getDate()
	var mes = fecha_actual.getMonth() + 1
	var anio = fecha_actual.getFullYear()

	if (mes < 10)
	mes = '0' + mes

	if (dia < 10)
	dia = '0' + dia

	return (dia + "/" + mes + "/" + anio)
	}

	function MostrarFecha() {
	document.write ( obtiene_fecha() )
	}
	

//---------------------- Muestra Listado de Facturas para generar la Orden de Pago -----------------//jWindow 
	function getDevenOP(){
		//jWindow('<iframe width="800" height="400" name="FAC" id="FAC" frameborder="0" src="../../sam/consultas/muestra_dev_op.action?idtipogasto=1"></iframe>','Devengado para la Orden de Pago', '','Cerrar',1);
		swal({
			  title: 'Devengado para la Orden de Pago',
			  //text: 'Seleccione el nuevo grupo de firma',
			  html:
				  '<iframe width="800" height="400" name="FAC" id="FAC" frameborder="0" src="../../sam/consultas/muestra_dev_op.action?idtipogasto=1"></iframe>',
			  width: 800,
			  padding: 10,
			  animation: false
			})
	}	
	
//--------------------------------------Generar la Orden de Pago desde una lista de facturas *****------18/05/2017	
function generarOPS(checkFacturas){
	 //alert ("demos del listado orden pago.js" + checkFacturas);
	
	 //alert("id unidad" + $('#cbUnidad').val());
	   controladorOrdenPagoRemoto.geraropxfacturas($('#cbUnidad').val(),checkFacturas,{
			callback:function(items){
				alert("orden de pago generada" + items);
			} 					   				
			,
			errorHandler:function(errorString, exception) { 
				swal('Oops 12...','Fallo la operacion:<br>Error:: ' + errorString + '-message:: ' + exception.message + '-JavaClass:: ' + exception.javaClassName + '.<br>Consulte a su administrador','warning');
			}
		
	});
}

//----------------------------------- Funcion para guardar la Orden de Pago Nueva ---------------------------------------------

function guardar() {
   
   var tipo_gto = $('#tipoGasto').selectpicker('val');
   
   /*if ($('#fecha').attr('value')=="") {//jAlert('La fecha de la Orden de Pago no es vÃ¡lida'); 
    	swal({
      	  title: 'Error!',
      	  text: 'La fecha de la Orden de Pago no es vÃ¡lida',
      	  type: 'error',
      	  confirmButtonText: 'Cool'
      	})
      	return false;};*/
    
    if ($('#xBeneficiario').selectpicker('val')==null) {
    	swal({
        	  title: 'Error!',
        	  text: 'El Beneficiario seleccionado no es válido',
        	  type: 'error',
        	  confirmButtonText: 'Cool'
        	})
    
    return false;}
    if ($('#xNota').val()=="") {//jAlert('El concepto de la Orden de Pago no es válido');
    	swal({
      	  title: 'Error!',
      	  text: 'El concepto de la Orden de Pago no es válido',
      	  type: 'error',
      	  confirmButtonText: 'Cool'
      	})
    return false;}
    
   	//Comprobar el tipo de gasto al guardar
  
    swal.queue([{
		  title: 'Guardar orden de pago',
		  text: 'Confirma que desea guardar la orden de pago',
		  confirmButtonText: 'Confirmar',
		  showLoaderOnConfirm: true,
		  preConfirm: function () {
		    return new Promise(function (resolve) {
		    	
		    	controladorOrdenPagoRemoto.validarTipoGasto(($('#id_orden').val()=='' ? 0:$('#id_orden').val()), tipo_gto, "", {
					callback:function(items){
						if(items=='')
							_guardarOP();
						else
							//jError(items,'Error');
						swal(items,'error');
					} 					   				
					,
					errorHandler:function(errorString, exception) { 
						swal(errorString,'error');
					}
		    	});
		        resolve();
		    })
		  }
		}]).then(function (resolve) {
			swal({
				  title: 'Guardando',
				  text: 'Documento guardado con exito. ', 
				  timer: 3000,
				  onOpen: function () {
				    swal.showLoading()
				  }
				}).then(
				  function () {},
				  // handling the promise rejection
				  function (dismiss) {
				    if (dismiss === 'timer') {
				      console.log('Cerrado por terminar el tiempo')
				    }
				  }
				)
		})
}

function _guardarOP(){
		
	
		var idOrden=$('#id_orden').val();
		var check = $('#reembolso').is(':checked');
		var temp_check = "";
		
		if(check) temp_check = "S"; else temp_check = "N";
	  	
		//alert('Numero de OP: ' +idOrden );
	  controladorOrdenPagoRemoto.guardarOrden( idOrden,$('#xTipo').selectpicker('val'),$('#fecha').val(),$('#xBeneficiario').selectpicker('val'),null,temp_check,$('#xConcurso').val(),$('#xNota').val(),$('#estatus').val(),null, $('#xImporteIva').val(),$('#cbUnidad').val(),$('#cbomes').selectpicker('val'),$('#tipoGasto').selectpicker('val'), ($('#CVE_CONTRATO').val()=='' ? 0:$('#CVE_CONTRATO').val()),{
	  callback:function(items) {
		  ID_DEPENDENCIA = $('#cbUnidad').attr('value');
		  $('#id_orden').val(items); 
		  $('#cve_op').val(items);     
		  $('#NoOrden').html(rellenaCeros(items.toString(), 6));
		  $('#tabsOrdenes').tabs( 'enable' , 1);
		  $('#tabsOrdenes').tabs( 'enable' , 2);
		  $('#tabsOrdenes').tabs( 'enable' , 3);	  
		  if (parseInt($('#xTipo').attr("value")) !=5 )
			  $('#tabsOrdenes').tabs( 'enable' , 4);
		  if(idOrden==0) $('#tabsOrdenes').tabs('option', 'selected', 1);
		  cambiarModoDetalle();	  
		  CloseDelay("Orden de Pago guardada con éxito");	  
	} 					   				
	,
	errorHandler:function(errorString, exception) { 
		/*jError(errorString, 'Error');*/      
	}
},async=false );
}

/* ------------------------------------- Mostrar Anexos de ordenes de pago al cargar o editar ----------------------------------------------*/
// 1.- Entra en la clase de llenarTablaDeDocumentos
// 2.- Llama la clase pintaDocumentos
//-------------------------------- Muestra los Documentos anexos de la Orden de Pago----------------------------------
function llenarTablaDeDocumentos() {
	
	 quitRow("listasDocumentos");
	 //var idOrden=$('#cve_op').val();
	 var idOrden=$('#id_orden').val();
	 controladorOrdenPagoRemoto.getDocumentosOrdenes(idOrden, {
       callback:function(items) { 		
		jQuery.each(items,function(i) {
		    pintaDocumentos( "listasDocumentos", i+1,this.ANX_CONS,this.T_DOCTO,this.NUMERO,this.NOTAS,this.DESCR, this.FILENAME, this.FILELENGTH, this.FILETYPE, this.FILEPATH);			
       });		
       } 					   				
       ,
       errorHandler:function(errorString, exception) { 
    	   swal('Oops 13...','Fallo la operacion:<br>Error:: ' + errorString + '-message:: ' + exception.message + '-JavaClass:: ' + exception.javaClassName + '.<br>Consulte a su administrador','warning');
       }
   },async=false ); 
}

/*-------------------------------- Clase que muestra los documentos anexos de las ordenes de pago desde la clase llenarTablaDeDocumentos() -----------------------------*/
function pintaDocumentos( table, consecutivo,idDocumento,tipoMovimiento,numero,nota,desTipoDoc, filename, filelength, filetype, filepath){
	
	var tabla = document.getElementById( table ).tBodies[0];
	var row =   document.createElement( "TR" );  
  var htmlEdit = "<img src=\"../../imagenes/page_white_edit.png\" style='cursor: pointer;' alt=\"Editar registro\" width=\"16\" height=\"16\" border=\"0\" onClick='editarDocumento("+idDocumento+",\""+tipoMovimiento+"\",\""+numero+"\",\""+nota+"\")' >"; 	
  var htmlCheck = "<input type='checkbox' name='clavesDocumentos' id='clavesDocumentos' value='"+idDocumento+"' >";
	row.appendChild(Td("",centro,"",htmlCheck) );
	row.appendChild(Td(desTipoDoc,izquierda) );
	row.appendChild(Td(numero,centro) );
	row.appendChild(Td(nota,izquierda) );
	row.appendChild(Td("", izquierda, "", "<strong><a href='"+filepath+filename+"' target='_blank'>"+getHTML(filename)+"</a></strong>"));
	row.appendChild(Td( (filelength==null) ? "": parseInt(parseInt(getHTML(filelength))/1024)+' kb', centro));
	row.appendChild(Td(getHTML(filetype), centro));
	row.appendChild(Td("",centro,"",htmlEdit) );
	tabla.appendChild( row );
}

/*-------------- Edita documentos de los anexos de las ordenes de pago --------------------------------------------------------*/
function editarDocumento(idDocumento,tipoMovimiento,numero,nota){
	$('#idDocumento').val(idDocumento);
	//$('#tipoMovDoc').val(tipoMovimiento);
	$('#tipoMovDoc').selectpicker('val',tipoMovimiento);
	$('#numeroDoc').val(numero);
	$('#notaDoc').val(nota);
} 

/*------------ CARGAR DETALLES DEL DEVENGADO A LA ORDEN DE PAGO SELECCIONADO DESDE la LISTA DE FACTURAS -------------*/
function generarDetallesFactura(checkIDs){
	var cve_op = $('#id_orden').val();
	//alert("Numero de Orden de pago: "+ cve_op);
	if (checkIDs.length > 0 ) {
		swal({
			  title: 'Incluir Facturas a la Orden de Pago!',
			  text: 'Cargando las Facturas seleccionadas....',
			  timer: 2000,
			  onOpen: function () {
			    swal.showLoading()
				controladorOrdenPagoRemoto.guardarFacturasEnOrdenPago(cve_op,checkIDs, {
					callback:function(items){	
							CargarIvaFactura();
							llenarTablaDeDetallesOrdenes();	
							llenarTablaDeDocumentos();
							llenarTablaDeRetenciones();
							llenarTablaDeVales();
							//CloseDelay("Facturas cargadas con exito");
							
					} 					   				
					,
					errorHandler:function(errorString, exception) { 
						swal('Oops...',errorString,'error');	    
					}
				}); 
			  }
			}).then(
			  function () {},
			  // handling the promise rejection
			  function (dismiss) {
			    if (dismiss === 'timer') {
			      console.log('I was closed by the timer')
			    }
			  }
			)
	
	}
	else
		swal({
	      	  title: 'Error!',
	      	  text: 'Es necesario que seleccione un elemento de la lista para realizar esta operaciÃ³n',
	      	  type: 'error',
	      	  confirmButtonText: 'Cerrar'
	      	})
		/*jAlert('Es necesario que seleccione un elemento de la lista para realizar esta operaciÃ³n', 'Advertencia');*/
	
}

//------------------------------ Inicio Listado de ordenes ------------------------------------------
//----------------------------- Carga desde el listado de Ordenes de Pago y llama pintaOrdenes() ---------------------------------
function llenarTablaDeOrdenes() {
	 quitRow("listaOrdenes");
	
	 var tipo=$('#xTipo').selectpicker('val');
	 var cveUnidad=$('#cbUnidad').val();//cbUnidad ---llenarTablaDeDetallesOrdenes
	 var ejercicio=$('#ejercicio').val();
	 var estatus=$('#estatus').val();
	 
	 //alert("Unidad: " +cveUnidad);
	controladorOrdenPagoRemoto.getOrdenesTipo(cveUnidad ,ejercicio,estatus, {
       callback:function(items) { 		
		jQuery.each(items,function(i) {
		    pintaOrdenes( "listaOrdenes", i+1,this.CVE_OP,this.NUM_OP,this.FECHA,this.DESCRIPCION_ESTATUS,this.NOTA,this.TIPO_DOC);
       });
       } 					   				
       ,
       errorHandler:function(errorString, exception) { 
    	   swal('Oops 14...','Fallo la operacion:<br>Error:: ' + errorString + '-message:: ' + exception.message + '-JavaClass:: ' + exception.javaClassName + '.<br>Consulte a su administrador','warning');
    	   
       }
   },async=false ); 
}

//--------------------- Manda a llamar el listado de Ordenes de Pago desde la Clase mostrarOrdenPago llevando como parametro el id de la orden de pago
function pintaOrdenes( table, consecutivo,id,numOp,fecha,estatus,nota,tipo){
 	var tabla = document.getElementById( table ).tBodies[0];
 	var row =   document.createElement( "TR" );    
    var html = "<img src=\"../../imagenes/page_white_edit.png\" style='cursor: pointer;' alt=\"Editar registro\" width=\"16\" height=\"16\" border=\"0\" onClick='mostrarOrdenPago("+id+")' >"; 	
	row.appendChild( Td(numOp,izquierda) );
	row.appendChild( Td(tipo,izquierda) );
	row.appendChild( Td(fecha,centro) );
	row.appendChild( Td(nota,izquierda));
	row.appendChild( Td(estatus) );
	row.appendChild( Td("",centro,"",html) );
	tabla.appendChild( row );
 } 

/*------------------------- funcion para mostrar la orden de pago llamada desde el listado de orden de pago --------------------------------------------------*/
function mostrarOrdenPago(idOrden){
	
	if(idOrden!=0){
		//ShowDelay('Cargando Orden de Pago','');
		controladorOrdenPagoRemoto.getOrden(idOrden,{
			
	    callback:function(items) {

	    	$('#cbUnidad').selectpicker('val',items.ID_DEPENDENCIA);
	    	$('#id_orden').val(items.CVE_OP);
	    	$('#CveOrdenOP').val(idOrden);
	    	$('#NoOrden').text(items.NUM_OP);
			$('#xBeneficiario').selectpicker('val',items.CLV_BENEFI);	
			$('#xNota').val(items.NOTA);
			$('#tipoGasto').selectpicker('val',items.ID_RECURSO);	 
			$('#xImporteIva').val(items.IMPORTE_IVA);
			$('#estatus').val(items.STATUS);
			$('#fecha').val(items.FECHA);
			$('#xConcurso').val(items.CONCURSO);
			
						
			nuevaOp();
			if (items.REEMBOLSOF=='S')
				$('#reembolso').prop('checked',true);
			
			llenarTablaDeDetallesOrdenes();
			llenarTablaDeRetenciones();
			llenarTablaDeDocumentos();
			llenarTablaDeVales();
			
	    } 					   				
	    ,
	    errorHandler:function(errorString, exception) { 
	    	swal('Oops 6...','Fallo la operacion:<br>Error:: ' + errorString + '-message:: ' + exception.message + '-JavaClass:: ' + exception.javaClassName + '.<br>Consulte a su administrador','warning');
	}
	},async=false );
	}
}

//---------------- Viene del boton generar nueva op, oculta controles ------------------------------------------------------------------
function nuevaOp(){
	$('#cve_op').val('');
	$('#accion').val('');
    $('#tabsOrdenesEnca').show(); 
	$('#listaOrdenesPendientes').hide();
	$('#DivOPResults').hide();
	//$('#listaOrdenesPendientes').hide();//DivOPResults	
    
	//$("#DivOPResults").css("display", "none");
	
	//$("#DivHeadDependency").show();//Muesta el div de la unidad administrativa
	//$("#DivOPResults").show();
	//$('#tabsOrdenesEnca').show(); 
	//$('#DivOPResults').hide();//DivHeadDependency
	//$('.listaOrdenesPendientes').show();//listaOrdenesPendientes$(".listaOrdenesPendientes").hide();
	//$('#listaOrdenesPendientes').css('display','block');
	//listaOrdenesPendientes
	//$('#DivHeadDependency').hide();//$(".DivHeadDependency").hide();
	//$("#DivHeadDependency").css("display", "block");
	//$("#DivOPResults").css("display", "block");
	//getDevenOP();
}

//----------------- Limpia el formulario de la orden de pago ----------------------------------
function limpiarForma(){
	$('#cve_op').val('');
	$('#id_orden').val('');
	$('#fecha').val('');
	$('#xImporteIva').val('');
	$('#xBeneficiario').selectpicker('refresh');
	$('#xClaveBen').val('');
	$('#xConcurso').val('');
	$('#xNota').val('');
	$('#NoOrden').text('');
	//$('#NoFolio').text("");
	$('#reembolso').prop('checked',false);
	quitRow("listasDetallesOrdenes");
	quitRow("listasDocumentos");
	quitRow("listasRetenciones");
	//$('#tab_requi').nav navs-tabs('option', 'disabled', [1,2,3,4]);//demo tab_requi
	//$("ul.nav li").removeClass('active').addClass('disabledTab');
	$('.nav-tabs a[href="#tabsCabe"]').tab('show')
	//$('.nav-tabs a[href="#' + tabs + '"]').tab('hide');
	$('#btnCerrar').prop('disabled',true);
    $('#tipoGasto').selectpicker('refresh');
	$('#xTipo').selectpicker('refresh');
	lipiarDocumento();	
	limpiarRetencion ();
	removerContrato();
}

/*---------------------------- Inicio de Vales ------------------------------------------*/
/*------- 1.-llenarTablaDeVales desde la edicion de la orden de pago --listasVales */
function llenarTablaDeVales() {
	 quitRow("listasVales");
	 var idOrden=$('#id_orden').val();
	 
	 controladorOrdenPagoRemoto.getValesOrdenes(idOrden, {
	   callback:function(items) { 		
			jQuery.each(items,function(i) {
				pintaVales( "listasVales", i+1,this.ID_PROYECTO,this.N_PROGRAMA,this.CLV_PARTID,this.CVE_VALE,this.NUM_VALE,this.IMPORTE, this.IMP_ANTERIOR, this.IMP_PENDIENTE, this.ID_VALE);
	        });
	   } 					   				
        ,
        errorHandler:function(errorString, exception) { 
        	swal('Oops 8...','Fallo la operacion:<br>Error:: ' + errorString + '-message:: ' + exception.message + '-JavaClass:: ' + exception.javaClassName + '.<br>Consulte a su administrador','warning');
        }
    },async=false ); 
 }
/*--------------------------- Carga las retenciones para su edicion u ediciones de op ------------------------------------*/
function llenarTablaDeRetenciones() {
	 quitRow("listasRetenciones");
	 var idOrden=$('#id_orden').val();
	 controladorOrdenPagoRemoto.getTodasRetencionesOrdenes(idOrden, {
     callback:function(items) { 		
		jQuery.each(items,function(i) {
		    pintaRetenciones( "listasRetenciones", i+1,this.RET_CONS,this.CLV_RETENC,this.RETENCION,this.IMPORTE);
     });
				  
     } 					   				
     ,
     errorHandler:function(errorString, exception) { 
    	 swal('Oops...',errorString,'error');
     }
 },async=false ); 

}

function cerrarOrden( ) {
	var tipo_gto = $('#tipoGasto').selectpicker('val');

	swal({
		  title: 'Cerrar Orden de Pago',
		  text: '¿Confirma que desea cerrar la Orden de Pago?',
		  type: 'question',
		  showCancelButton: true,
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  confirmButtonText: 'Si, cerrar'
		}).then(function (r) {
			if(r){
				swal.showLoading('Cerrando la orden de pago');
				controladorOrdenPagoRemoto.validarTipoGasto($('#id_orden').val(), tipo_gto, "x", {
					callback:function(items){
						if(items=='')
							_cerrarOrden();
						else
							swal('Oops...',errorString,'info');
					} 					   				
					,
					errorHandler:function(errorString, exception) { 
						swal('Oops...',errorString,'error');
					}
			},async=false );
		}
			swal({
				  title: 'Confirmacion',
				  text: 'La orden de pago se cerro correctamente!..',
				  timer: 2000,
				  onOpen: function () {
				    swal.showLoading()
				  }
				}).then(
				  function () {},
				  // handling the promise rejection
				  function (dismiss) {
				    if (dismiss === 'timer') {
				      console.log('I was closed by the timer')
				    }
				  }
				)
		})
}

function _cerrarOrden(){
	controladorOrdenPagoRemoto.cerrarOrden( $('#id_orden').val(), {
				callback:function(items) {
					if (items != "exito")
							jAlert(items, 'Advertencia');
					   else {
						   getReporteOP($('#id_orden').val());
						   limpiarForma();
						   $('#btnCerrar').prop('disabled',true);	
						   CloseDelay("Orden de Pago cerrada con éxito");
					   }	  
				} 					   				
				,
				errorHandler:function(errorString, exception) { 
					swal('Oops...',errorString,'error');
				}
			
		});
}
function getReporteOP(clave) {
	$('#cve_op').attr('value',clave);
	$('#forma').attr('action',"../reportes/formato_orden_pago.action");
	$('#forma').attr('target',"impresion");
	$('#forma').submit();
	$('#forma').attr('target',"");
	$('#forma').attr('action',"");
	}

function pintaRetenciones( table, consecutivo,idRetencion,idTipoRetencion,retencion,importe){
 	var tabla = document.getElementById( table ).tBodies[0];
 	var row =   document.createElement( "TR" );    
    var htmlEdit = "<img src=\"../../imagenes/page_white_edit.png\" style='cursor: pointer;' alt=\"Editar registro\" width=\"16\" height=\"16\" border=\"0\" onClick='editarRetencion("+idRetencion+",\""+idTipoRetencion+"\","+importe+")' >"; 	
    var htmlCheck = "<input type='checkbox' name='clavesRetencion' id='clavesRetencion' value='"+idRetencion+"' >";
	row.appendChild( Td("",centro,"",htmlCheck) );
	row.appendChild( Td(retencion,izquierda) );
	row.appendChild( Td(formatNumber(importe,"$"),derecha) );
	row.appendChild( Td("",centro,"",htmlEdit) );
	tabla.appendChild( row );
 }
 
 function editarRetencion (idRetencion,idTipoRetencion,importe) {
 	$('#idRetencion').val(idRetencion);//.selectpicker('val')
	$('#retencion').selectpicker('val',idTipoRetencion);
	if (importe < 0 )
	  importe=importe*-1;
	$('#importeRetencion').val(importe);
 } 
 
 
 function limpiarRetencion () {
 	$('#idRetencion').attr('value','');
	$('#importeRetencion').attr('value',"");
 }

//VALIDAR LA RETENCION A SOLO LECTURA.........................
function guardarRetencion(){
	var error="";  
 	var cveParbit=$('#tipoGasto').val();
 	var clv_retencion = $('#retencion').selectpicker('val');
 	
	var idOrden=$('#id_orden').attr('value');
   if($('#retencion').selectpicker('val')=="") {swal('El tipo de Retención no es válido','Advertencia'); return false;}
   if($('#importeRetencion').attr('value')=="") {swal('El Importe de la Retención no es válido','Advertencia'); return false;}
	//ShowDelay('Guardando retenciÃ³n','');
    swal.showLoading();
	controladorOrdenPagoRemoto.guardarRetencion($('#idRetencion').val(),clv_retencion,$('#importeRetencion').val(),cveParbit,idOrden,{
	callback:function(items) { 	 
		  if (items==true) {
			llenarTablaDeRetenciones();
			CloseDelay("Retención guardada con éxito", 2000, function(){
				limpiarRetencion();	
			});	
		  } else
			swal('Oops...','La retención ya se encuentra en la Orden de Pago!','error');	  	  	  
		} 					   				
		,
		errorHandler:function(errorString, exception) { 
			swal('Oops...','La retención ya se encuentra en la Orden de Pago!','error');	 
		}
			
	}); 
}
//eliminarRetencion
function eliminarRetencion(){
	  var checkRetenciones = [];
    $('input[name=clavesRetencion]:checked').each(function() {checkRetenciones.push($(this).val());	 });	 
	 var cveParbit=$('#tipoGasto').attr('value');
 	 var idOrden=$('#id_orden').attr('value');
	 if (checkRetenciones.length > 0 ) {
		swal({
			  title: 'Eliminar retención!',
			  text: '¿Confirma que desea eliminar la retención?',
			  type: 'warning',
			  showCancelButton: true,
			  confirmButtonColor: '#3085d6',
			  cancelButtonColor: '#d33',
			  confirmButtonText: 'Yes, delete it!'
			}).then(function (r) {
				if(r){
				 	//ShowDelay('Eliminando retencione(s)','');
					swal.showLoading();
					controladorOrdenPagoRemoto.eliminarRetenciones(checkRetenciones,idOrden, {
					callback:function(items) { 	
					   llenarTablaDeRetenciones();	
					   CloseDelay("Retencion(es) eliminada(s) con éxito");
					   
					} 					   				
					,
					errorHandler:function(errorString, exception) { 
						//jError(errorString, 'Error');
						swal('Oops...',errorString,'error');	
					}
				},async=false );
			}
				swal({
					  title: 'Confirmacion',
					  text: 'La retencion se elimino correctamente!..',
					  timer: 2000,
					  onOpen: function () {
					    swal.showLoading()
					  }
					}).then(
					  function () {},
					  // handling the promise rejection
					  function (dismiss) {
					    if (dismiss === 'timer') {
					      console.log('I was closed by the timer')
					    }
					  }
					)
			})
    	 } else 
	    //jAlert('Es necesario que seleccione un elemento de la lista', 'Advertencia');
	 	swal('Oops...','Es necesario que seleccione un elemento de la lista','error');	
	 }
/*Fin de retenciones*/


/*-------------------------------- Carga el Listado de detalles de ordenes para editar una op desde el listado de ordenes de pago -----------------------------------*/
function llenarTablaDeDetallesOrdenes() {
	
	var c =0;
	var imp_total = 0;
	 quitRow("listasDetallesOrdenes");
	 //var idOrden=$('#cve_op').val();
	 var idOrden=$('#id_orden').val();
	 controladorOrdenPagoRemoto.getDetallesOrdenes(idOrden, {
        callback:function(items) { 		
		jQuery.each(items,function(i) {
			c++;
			imp_total+= this.MONTO;
 		    pintaDetallesOrdenes( "listasDetallesOrdenes", i+1,this.DEPENDENCIA,this.ID_PROYECTO, this.N_PROGRAMA,this.CLV_PARTID,this.MONTO,this.NOTA,this.ID_MOV_OP,this.TIPO, this.CVE_VALE);
			 if(items.length==c) pintarTotalConceptos("listasDetallesOrdenes", imp_total);
        });
		getSelectGrados(items);
		 
		if (items.length > 0) {
			
			//$('#nav nav-tabs').tabs( 'active' , 1);
			$('#tabsOrdenesPane a:first').tab('show');
		    $('#btnCerrar').prop('disabled',false);
		    $('#tipoGasto').prop('disabled',true);
			$('#xTipo').prop('disabled',true);
		}
		else {		 
		   $('#btnCerrar').prop('disabled',true);
		   $('#tipoGasto').prop('disabled',false);
		   $('#xTipo').prop('disabled',false);
		}
        } 					   				
        ,
        errorHandler:function(errorString, exception) { 
        	swal('Oops 9...','Fallo la operacion:<br>Error:: ' + errorString + '-message:: ' + exception.message + '-JavaClass:: ' + exception.javaClassName + '.<br>Consulte a su administrador','warning');	
        }
    },async=false ); 

 }
function pintarTotalConceptos(tabla, importe_total){
	var tabla = document.getElementById(tabla).tBodies[0];
 	var row =   document.createElement( "TR" );    
	var htmlEdit = '<strong>'+formatNumber(importe_total, '$')+'</strong>';
	row.appendChild( Td('',centro,'',''));
	row.appendChild( Td('',centro,'',''));
	row.appendChild( Td('',centro,'',''));
	row.appendChild( Td('',centro,'',''));
	row.appendChild( Td('',centro,'',''));
	row.appendChild( Td('',centro,'',''));
	row.appendChild( Td('',derecha,"",htmlEdit));
	row.appendChild( Td('',centro,'',''));	
	tabla.appendChild(row);
}
function getSelectGrados(datos) {		
    lipiarVale();
	dwr.util.removeAllOptions("proyectoCuenta");
	dwr.util.addOptions('proyectoCuenta',{ 0:'Seleccione' });
	dwr.util.addOptions('proyectoCuenta',datos,"ID_PROYECTO", "PROYECTOPARTIDA" );		
}

function CargarIvaFactura()
{
	var cve_op = $('#id_orden').attr('value');
	controladorOrdenPagoRemoto.obtenerIvaOrdenPago(cve_op,{
		callback:function(items){	
			if($('#xImporteIva').val() =='0' || $('#xImporteIva').val() =='')
				$('#xImporteIva').val(items);
		} 					   				
		,
			errorHandler:function(errorString, exception) { 
				jError(errorString, 'Error');
			}
	}); 				
}

/*
function cambiarModoDetalle(){
	$('#filaFacturas').hide();
	if ($('#xTipo').attr('value')!=0 && $('#xTipo').attr('value')!=2){
		$('#filaGuardar').show();
		$('#img_presupuesto').show();
	}
	else{
		$('#filaGuardar').hide();
		$('#img_presupuesto').hide();		
	}
	
	
	if ($('#xTipo').attr('value')==0 )
		$('#filaPedido').show();
	else
		$('#filaPedido').hide();
		
	if ($('#xTipo').attr('value')==2 )
		$('#filaReq').show();
	else	
		$('#filaReq').hide();
		
	if ($('#xTipo').attr('value')==2 || $('#xTipo').attr('value')==0  ){
		$('#filaSelectVale').hide();
		$('#filaDisponibleVale').hide();
		$('#filaUnidadProyPart').hide();
		$('#filaDetProyPart').hide();
		$('#filaDetPres').hide();
		$('#filaDetNota').hide();
		$('#filaDetImporte').hide();
		$('#btnNuevo').hide();
		$('#filaFacturas').hide();
		$('#filaContrato').hide();
	}else {
		$('#filaSelectVale').hide();
		$('#filaDisponibleVale').hide();
		$('#filaUnidadProyPart').show();
		$('#filaDetProyPart').show();
		$('#filaDetPres').show();
		$('#filaDetNota').show();
		$('#filaDetImporte').show();
		$('#btnNuevo').show();
		$('#filaContrato').hide();
		$('#filaFacturas').hide();
	}
	
	if ($('#xTipo').attr('value')==11)
	{
		$('#filaSelectVale').show();
		$('#filaDisponibleVale').show();
		$('#filaUnidadProyPart').hide();
		$('#filaDetProyPart').show();
		$('#filaDetPres').show();
		$('#filaDetNota').show();
		$('#filaDetImporte').show();
		$('#btnNuevo').show();
		$('#filaContrato').hide();
		$('#filaFacturas').hide();
	}
	
	if($('#xTipo').attr('value')==12)
	{
		$('#filaSelectVale').hide();
		$('#filaDisponibleVale').hide();
		$('#filaUnidadProyPart').hide();
		$('#filaDetProyPart').hide();
		$('#filaDetPres').hide();
		$('#filaDetNota').hide();
		$('#filaDetImporte').hide();
		$('#btnNuevo').hide();
		$('#filaGuardar').hide();
		$('#filaContrato').hide();
		$('#filaFacturas').show();
	}
	if($('#xTipo').attr('value')==13)
	{
		$('#filaSelectVale').hide();
		$('#filaDisponibleVale').hide();
		$('#filaUnidadProyPart').hide();
		$('#filaDetProyPart').hide();
		$('#filaDetPres').hide();
		$('#filaDetNota').hide();
		$('#filaDetImporte').hide();
		$('#btnNuevo').hide();
		$('#filaGuardar').hide();
		$('#filaFacturas').hide();
		$('#filaContrato').show();
	}
	
}*/




function pintaDetallesOrdenes( table, consecutivo,unidad, idproyecto, proyecto,partida,monto,nota,idDetalle,tipo, idVale){
	if(idVale==''||idVale==null) idVale=0;
    var htmlEdit = '<img src=\"../../imagenes/page_white_edit.png\" style="cursor: pointer;" alt="Editar registro" width="16" height="16" border="0" onClick="editarDetalle('+idDetalle+','+idVale+','+idproyecto+',\''+proyecto+'\', \''+partida+'\',\''+monto+'\',\''+nota+'\')">';
	//,\''+proyecto+'\','+partida+'\',\''+monto+'\',\''+nota+'\')>"'; 	
    var htmlCheck = "<input type='checkbox' name='clavesDetalles' id='clavesDetalles' value='"+idDetalle+"' >";	  
 	var tabla = document.getElementById( table ).tBodies[0];
 	var row =   document.createElement("TR");    
	row.appendChild(Td("",centro,"",htmlCheck));
	row.appendChild(Td(unidad,izquierda));
	row.appendChild(Td(nota,izquierda));
	row.appendChild(Td(proyecto,centro));
	row.appendChild(Td(partida,centro));
	row.appendChild(Td(getHTML(tipo),centro));
	row.appendChild(Td(formatNumber(monto,"$"),derecha) );
	row.appendChild(Td("",centro,"",htmlEdit));
	tabla.appendChild(row);
 }
 

//--------------------------------------Generar la Orden de Pago desde una lista de facturas------18/05/2017	
function generarOPS(checkFacturas){
	 //alert ("demos del listado orden pago.js");

	   controladorOrdenPagoRemoto.geraropxfacturas($('#cbounidad').val(),checkFacturas.toString(),{
			callback:function(items){
				alert("orden de pago generada" + items);
			} 					   				
			,
			errorHandler:function(errorString, exception) { 
				swal('Oops 10...','Fallo la operacion:<br>Error:: ' + errorString + '-message:: ' + exception.message + '-JavaClass:: ' + exception.javaClassName + '.<br>Consulte a su administrador','warning');
			}
		
	});
}

