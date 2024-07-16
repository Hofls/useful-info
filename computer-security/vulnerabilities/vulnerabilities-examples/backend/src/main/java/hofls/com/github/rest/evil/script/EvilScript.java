package hofls.com.github.rest.evil.script;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api(description = "Service for evil script")
@RequestMapping("/evil-script")
@RestController
public class EvilScript {

    @ApiOperation(value = "Returns evil script", notes = "")
    @GetMapping
    public String getScript() {
        return convertStreamToString(
                EvilScript.class.getResourceAsStream(
                        "/evil-script.js"));
    }

    private String convertStreamToString(java.io.InputStream is) {
        java.util.Scanner s = new java.util.Scanner(is).useDelimiter("\\A");
        return s.hasNext() ? s.next() : "";
    }


}
