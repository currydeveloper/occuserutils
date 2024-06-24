package sailpoint.plugin.occuserutils.rest;

import java.util.*;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.apache.log4j.Logger;

import sailpoint.api.SailPointContext;
import sailpoint.api.SailPointFactory;
import sailpoint.rest.plugin.BasePluginResource;
import sailpoint.rest.plugin.RequiredRight;
import sailpoint.tools.GeneralException;

@RequiredRight(value = "userutilsRESTAllow")
@Path("userutils")
public class UserutilsResource extends BasePluginResource {
	public static final Logger log = Logger.getLogger("com.theocc.userutils");
	private static SailPointContext context;

	@GET
	@Path("currentuser")
	@Produces(MediaType.APPLICATION_JSON)
	@RequiredRight(value = "currentuser")
	public Response getCurrentuser() {
		log.debug("GET currentuser");
		try {
			context = this.getContext();
			String user = context.getUserName();
			log.debug("logged in user is:" + user);
			Map<String, String> responseMap = new HashMap<>();
			responseMap.put("name", user);
			return Response.ok().entity(responseMap).build();
		} catch (Exception e) {
			e.printStackTrace();
			return Response.status(500).entity(e).build();
		}

	}

	@Override
	public String getPluginName() {
		return "occuserutils";
	}
}
