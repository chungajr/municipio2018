package mx.gob.municipio.centro.view.controller.sam.utilerias;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import mx.gob.municipio.centro.model.gateways.sam.GatewayContratos;
import mx.gob.municipio.centro.view.bases.ControladorBase;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

public class ControladorMuestraValesContratos extends ControladorBase {
	
	@Autowired
	private GatewayContratos gatewayContratos;
	
	public ControladorMuestraValesContratos() {
		// TODO Auto-generated constructor stub
	}
	
	@SuppressWarnings("unchecked") 
	@RequestMapping(method = {RequestMethod.GET,RequestMethod.POST})  
	public String  requestGetControlador( Map modelo, HttpServletRequest request) {
		Long cve_vale = (request.getParameter("idVale")!=null) ? Long.parseLong(request.getParameter("idVale").toString()): 0L;
		int idDependencia = (!request.getParameter("idDependencia").equals("0")) ? Integer.parseInt(request.getParameter("idDependencia").toString()): Integer.parseInt(this.getSesion().getIdUnidad()) ;
		String clv_benefi = request.getParameter("clv_benefi");
		int tipo_gto = (request.getParameter("tipo_gto")!=null) ? Integer.parseInt(request.getParameter("tipo_gto").toString()): 0;
		int tipo_doc = (request.getParameter("tipo_doc")!=null) ? Integer.parseInt(request.getParameter("tipo_doc").toString()): 0;
		
		modelo.put("documentos", gatewayContratos.getListaValesPresupuesto(cve_vale, clv_benefi,  tipo_gto, tipo_doc, this.getSesion().getIdUsuario(), idDependencia));

	    return "sam/consultas/muestraVales_tipo_contratos.jsp";
	}

}
