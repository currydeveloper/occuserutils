package sailpoint.plugin.occuserutils.rest;

import java.util.*;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import sailpoint.rest.plugin.BasePluginResource;
import sailpoint.rest.plugin.RequiredRight;

@RequiredRight(value = "userutilsRESTAllow")
@Path("userutils")
public class UserutilsResource extends BasePluginResource {
	public static final Log log = LogFactory.getLog(UserutilsResource.class);

	@GET
	@Path("currentuser")
	@Produces(MediaType.APPLICATION_JSON)
	@RequiredRight(value = "currentuser")
	public Map getCurrentuser() {
		log.debug("GET currentuser");
		Map ret = null;
		return ret;
	}

	@Override
	public String getPluginName() {
		return "occuserutils";
	}
}
