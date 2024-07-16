package hofls.com.github.rest.profile;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.*;

@Api(description = "User profile")
@RequestMapping("/profile")
@RestController
public class Profile {

    private String profileMessage = "On the vacation!";

    @ApiOperation(value = "Returns profile message", notes = "")
    @GetMapping(value="{id}")
    public String getProfileMessage(@PathVariable(value = "id") Long id) {
        return profileMessage;
    }

    @ApiOperation(value = "Updates profile message", notes = "")
    @PutMapping(value="{id}")
    public String updateMessage(@PathVariable(value = "id") Long id, @RequestBody String message) {
        profileMessage = message;
        return profileMessage;
    }


    private String password = "qwerty123";

    @ApiOperation(value = "Returns password", notes = "")
    @GetMapping(value="{id}/password")
    public String getPassword(@PathVariable(value = "id") Long id) {
        return password;
    }

    @ApiOperation(value = "Updates password", notes = "")
    @PutMapping(value="{id}/password")
    public String updatePassword(@PathVariable(value = "id") Long id, @RequestBody String password) {
        this.password = password;
        return this.password;
    }

}
