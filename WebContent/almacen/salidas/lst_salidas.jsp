<%@ page contentType="text/html;charset=utf-8"  %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>Listado de Entradas de Documentos</title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<link rel="stylesheet" href="../../include/css/estilosam.css" type="text/css">
<link rel="stylesheet" href="../../include/js/componentes/jquery.alerts.css" type="text/css">
<link type="text/css" href="../../include/js/utilsJquery/jquery-ui-1.7.1.custom.css" rel="stylesheet" />
<link rel="stylesheet" href="../../include/js/autocomplete/jquery.autocomplete.css" type="text/css" />	
<script type="text/javascript" src="../../include/js/jquery-1.3.2.min.js"></script>
<script type="text/javascript" src="../../include/js/toolSam.js"></script>
<script type="text/javascript" src="lst_salidas.js?x=<%=System.currentTimeMillis()%>"> </script>
<script type="text/javascript" src="../../include/js/autocomplete/jquery.autocomplete.js"></script>
<script type="text/javascript" src="../../include/js/componentes/jquery.alerts.js"></script>
<script type="text/javascript" src="../../dwr/interface/autocompleteDiversosRemoto.js"> </script>
<script type="text/javascript" src="../../include/js/autocomplete/autompleteVarios.js"></script>
<script type="text/javascript" src="../../include/js/componentes/jquery.alerts.js"></script>
<script type="text/javascript" src="../../include/js/utilsJquery/jquery-ui-1.7.1.custom.min.js"></script>
<script type="text/javascript" src="../../dwr/interface/ControladorListadoSalidasRemoto.js"> </script>
<script type="text/javascript" src="../../dwr/engine.js"></script>
<script type="text/javascript" src="../../dwr/util.js"> </script>
<link rel="stylesheet" href="../../include/css/css/css3-buttons.css" type="text/css" media="screen">
<link rel="stylesheet" href="../../include/css/tiptip.css" type="text/css"  media="screen">
<script type="text/javascript" src="../../include/js/bootstrap-3.3.7.js"></script>
<script type="text/javascript" src="../../include/js/sweetalert2.js"></script>

<link rel="stylesheet" href="../../include/css/bootstrap-3.3.7.css" type="text/css">
<link rel="stylesheet" href="../../include/css/bootstrap2.css" type="text/css"/>
<link rel="stylesheet" href="../../include/css/sweetalert2.css" type="text/css">
<script src="../../include/css/jquery.tiptip.js"></script>
<style type="text/css">
<!--
a:link {
	text-decoration: none;
}
a:visited {
	text-decoration: none;
}
a:hover {
	text-decoration: underline;
}
a:active {
	text-decoration: none;
}
-->
</style></head>
<body class="Fondo" >
<form action="../reportes/salidas.action"  method="get" id="frmreporte" name="frmreporte">
<table width="95%" align="center"><tr><td><h1>Salidas - Listado de salidas</h1></td></tr></table>
<table width="95%" border="0" align="center" cellpadding="0" cellspacing="0" class="formulario">
  <tr >
    <th height="25">&nbsp;</th>
    <td colspan="3">
      <input name="ID_PROVEEDOR" type="hidden" id="ID_PROVEEDOR" value="<c:out value='${id_proveedor}'/>" />
      <input name="ID_ENTRADA" type="hidden" id="ID_ENTRADA" value="" />
      <input name="ID_SALIDA" type="hidden" id="ID_SALIDA" value="" />
      <input name="clavePedido" type="hidden" id="clavePedido" value="" />
      <input name="claveRequisicion" type="hidden" id="claveRequisicion" value="" />
      
      </td>
    <td>&nbsp;</td>
  </tr>
  <tr >
    <th height="30">Unidad administrativa:</th>
    <td colspan="3">
    <sec:authorize ifNotGranted="ROLE_Almacen_PRIVILEGIOS_VER_UNIDADES_ADMINISTRATIVAS">
      	<c:out value="${nombreUnidad}"/>
        <input type="hidden" id="cbodependencia" name="cbodependencia" value="<c:out value='${cbodependencia}'/>">
    </sec:authorize>
    <sec:authorize ifAllGranted="ROLE_Almacen_PRIVILEGIOS_VER_UNIDADES_ADMINISTRATIVAS">
        <div class="styled-select">
            <select name="cbodependencia" id="cbodependencia" style="width:445px">
                          <option value="0">[Seleccione]</option>
                          <c:forEach items="${unidadesAdmiva}" var="item" varStatus="status"> 
                          <option value='<c:out value="${item.ID}"/>' 
                            <c:if test='${item.ID==cbodependencia}'> selected </c:if>>
                            <c:out value='${item.DEPENDENCIA}'/>
                            </option>
                          </c:forEach>
             </select>
          </div>
    </sec:authorize>      
    </td>
    <td>&nbsp;</td>
  </tr>
  <tr >
    <th  width="242" height="30">      Almacen:</th>
    <td colspan="3">
    <div class="styled-select">
        <select name="cboalmacen" class="comboBox" id="cboalmacen" style="width:445px;">
          <option value="0">[Seleccione]</option>
          <c:forEach items="${almacenes}" var="item" varStatus="status"> <option value='<c:out value="${item.ID_ALMACEN}"/>' 
            <c:if test='${item.ID_ALMACEN==id_almacen}'> selected </c:if>>
            <c:out value='${item.DESCRIPCION}'/>
            </option>
          </c:forEach>
        </select>
      </div>
      </td>
    <td width="235">&nbsp;</td>
    </tr>
  <tr >
    <th height="30" >Por fecha desde:
      <td width="180"><input name="txtfechaInicial" type="text" class="input"  id="txtfechaInicial"  value="<c:out value='${fechaInicial}'/>" ></td>
    <td  align="right">&nbsp;<strong>Hasta:</strong> &nbsp;</td>
    <td><input name="txtfechaFinal" type="text" class="input"  id="txtfechaFinal"  value="<c:out value='${fechaFinal}'/>"></td>
    <td rowspan="2" >    <div class="buttons tiptip">
      <button name="cmdbuscar" id="cmdbuscar" type="button" class="button red middle"><span class="label" style="width:100px">Buscar</span></button>
      </div></td>
  </tr>
  <tr >
    <th height="30" >Programa:  
    <td><input name="txtproyecto" type="text" class="input"  id="txtproyecto"  value="<c:out value='${proyecto}'/>" ></td>
    <td width="110" align="right"><strong>Partida:</strong>&nbsp;</td>
    <td width="840"><strong>
      <input name="txtpartida" type="text" class="input"  id="txtpartida"  value="<c:out value='${partida}'/>" >
    </strong></td>
    </tr>
  <tr >
    <th height="30" >Proveedor:   
    <td colspan="3"><input name="txtbeneficiario" type="text" class="input"  id="txtbeneficiario"  value="<c:out value='${proveedor}'/>" style="width:445px"></td>
    <td >&nbsp;</td>
    </tr>
  <tr >
    <th height="30" >Número Requisición:  
    <td><input name="txtdocumento" type="text" class="input"  id="txtdocumento"  value="<c:out value='${num_documento}'/>" ></td>
    <td align="right"><strong>Num. de Pedido: </strong>&nbsp;</td>
    <td><strong>
      <input name="txtpedido" type="text" class="input"  id="txtpedido"  value="<c:out value='${id_pedido}'/>" >
    </strong></td>
    <td >&nbsp;</td>
    </tr>
  <tr >
    <th height="30" >Número de folio:
    <td><input name="txtfolio" type="text" class="input"  id="txtfolio"  value="<c:out value='${folio}'/>" ></td>
    <td align="right">&nbsp;</td>
    <td>&nbsp;</td>
    <td >&nbsp;</td>
  </tr>
  <tr >
    <td height="25" >&nbsp; </td>
    <td height="25" colspan="4" >&nbsp;</td>
    </tr>  
</table>
<br />
<table width="95%" border="0" cellpadding="0" cellspacing="0" class="listas" align="center" id="listaDocumentos">
 <thead>
  <tr>
  	<th width="3%" height="20">&nbsp;</th>
    <th width="7%" height="20">Folio</th>
    <th width="8%">Num. Requisicion</th>
    <th width="7%">Num. Pedido</th>
    <th width="7%">Fecha</th>
    <th width="46%">Concepto</th>
    <th width="9%">Programa/Partida</th>
    <th width="7%">Status</th>
    <th width="6%">Opciones</th>
  </tr>
   </thead>   
<tbody>  
<c:set var="cont" value="${0}" /> 
<c:forEach items="${listadoDocumentos}" var="item" varStatus="status"> 
  <tr id='f<c:out value="${cont}"/>' onMouseOver="color_over('f<c:out value="${cont}"/>')" onMouseOut="color_out('f<c:out value="${cont}"/>')">
  	<td height="25" align="center"><input type="checkbox" id="chksalidas" name="chksalidas" value="<c:out value='${item.ID_SALIDA}'/>"/></td>
    <td height="25" align="center"><c:out value='${item.FOLIO}'/></td>
    <td align="center"><a href="javascript:getRequisicion(<c:out value='${item.CVE_REQ}'/>)"><c:out value='${item.NUM_REQ}'/></td>
    <td align="center"><a href="javascript:getReportePedido(<c:out value='${item.CVE_PED}'/>)"> <c:out value='${item.NUM_PED}'/></a></td>
    <td align="center"><c:out value='${item.FECHA_ENTREGA}'/></td>
    <td><c:out value='${item.CONCEPTO}'/></td>
    <td align="center">[<c:out value='${item.ID_PROYECTO}'/>] <c:out value='${item.N_PROGRAMA}'/>/<c:out value='${item.PARTIDA}'/></td>
    <td align="center"><c:out value='${item.STATUS_DESC}'/></td>
    <td align="center"><img style="cursor:pointer" src="../../imagenes/pdf.gif" title="Ver Documento" border="0" width="14" height="16" onClick="getReporteSalida(<c:out value='${item.ID_SALIDA}'/>)"><c:if test='${item.STATUS==0}'>&nbsp;<img src="../../imagenes/page_white_edit.png" style="cursor:pointer" title="Editar / Abrir" onClick="editarDocumento(<c:out value='${item.ID_ENTRADA}'/>,<c:out value='${item.ID_SALIDA}'/>)"></c:if><c:if test='${item.STATUS==1||item.STATUS==2}'>&nbsp;<img src="../../imagenes/page_gray_edit.png" alt="" style="cursor:pointer"></c:if>
     <c:if test='${item.STATUS==0}'>
    	&nbsp;<img style="cursor:pointer" src="../../imagenes/cross.png" title="Cancelar Documento" border="0" width="16" height="16" onClick="cancelarDocumento(<c:out value='${item.ID_SALIDA}'/>)"> 
    </c:if>
    <c:if test='${item.STATUS==1||item.STATUS==2}'>
    	&nbsp;<img src="../../imagenes/cross2.png" title="Cancelar Documento" border="0" width="16" height="16"> 
    </c:if>
    </td>
  </tr>
  <c:set var="cont" value="${cont+1}"/> 
  </c:forEach>
   
  </tbody>  
</table>
<table width="95%" border="0" cellspacing="0" cellpadding="0" align="center">
  <tr>
    <td height="35" align="left">
    <table width="260" border="0" cellpadding="0" cellspacing="0">
      <tr>
        <td width="130" align="center"><div class="buttons tiptip">
          <div class="buttons tiptip">
            <button name="cmdinvalidar" id="cmdinvalidar" type="button" class="button red middle"><span class="label" style="width:100px">Invalidar</span></button>
          </div>
        </div></td>
        <td width="130"><button name="cmdautorizar" id="cmdautorizar" type="button" class="button red middle"><span class="label" style="width:100px">Entregar</span> </button></td>
      </tr>
    </table>
    </td>
  </tr>
</table>
</form>
</body>
</html>
