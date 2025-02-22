package hofls.com.github.rest.secretvalue;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.*;

@Api(description = "Secrets")
@RequestMapping("/secret-vault")
@RestController
public class SecretValue {


    @ApiOperation(value = "Returns secret", notes = "")
    @GetMapping(value="{id}")
    public String getSecret(@PathVariable(value = "id") Long id) {
        if (id.equals(1L)) {
            return "Loves coffee";
        } else if (id.equals(666L)) {
            return "Hates coffee";
        } else {
            throw new RuntimeException("You have no access to other user secrets!");
        }
    }


}
