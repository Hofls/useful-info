package hofls.com.github.rest.account;

import hofls.com.github.database.AccountDao;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api(description = "Bank account")
@RequestMapping("/account")
@RestController
public class Account {
    @Autowired
    AccountDao accountDao;


    @ApiOperation(value = "Returns account info", notes = "")
    @GetMapping(value="{id}")
    public String getAccount(@PathVariable(value = "id") String id) throws Exception {
        return accountDao.findById(id);
    }

}
