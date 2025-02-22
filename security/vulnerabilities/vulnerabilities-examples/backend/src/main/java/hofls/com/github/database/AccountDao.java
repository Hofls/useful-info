package hofls.com.github.database;

import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.sql.*;

@Component
public class AccountDao {

    private Connection connection;
    @PostConstruct
    public void init() throws SQLException {
        connection = DriverManager.getConnection("jdbc:h2:mem:testdb", "sa", "");
    }

    public String findById(String id) throws Exception {
        StringBuilder stringBuilder = new StringBuilder();
        try (Statement stmt = connection.createStatement()) {
            ResultSet resultSet = stmt.executeQuery("select * from account where id = " + id);
            while (resultSet.next()) {
                String name = resultSet.getString("first_name");
                String balance = resultSet.getString("balance");
                stringBuilder.append(name + " with " + balance + "$ \n");
            }
        }

        return stringBuilder.toString();
    }
}
