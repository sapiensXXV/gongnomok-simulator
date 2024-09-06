package site.gongnomok.data.configure;


import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.Profile;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.jdbc.datasource.LazyConnectionDataSourceProxy;
import site.gongnomok.data.infrastructure.RoutingDataSource;

import javax.sql.DataSource;
import java.util.HashMap;

@Configuration
@Slf4j
public class DatasourceConfig {

    private static final String SOURCE_SERVER = "SOURCE";
    private static final String REPLICA_SERVER1 = "REPLICA1";
    private static final String REPLICA_SERVER2 = "REPLICA2";
    
    @Bean
    @Profile("test")
    @Primary // 테스트 환경에서 우선적으로 사용
    public DataSource testDataSource() {
        log.info("테스트 데이터소스 초기화");
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName("org.h2.Driver");
        dataSource.setUrl("jdbc:h2:mem:db;DB_CLOSE_DELAY=-1");
        dataSource.setUsername("sa");
        dataSource.setPassword("");
        return dataSource;
    }
    
    @Bean
    @Qualifier(SOURCE_SERVER)
    @ConfigurationProperties(prefix = "spring.datasource.source")
    public DataSource sourceDataSource() {
        return DataSourceBuilder.create()
            .build();
    }
    
    @Bean
    @Qualifier(REPLICA_SERVER1)
    @ConfigurationProperties(prefix = "spring.datasource.replica1")
    public DataSource replicaDataSourceOne() {
        return DataSourceBuilder.create()
            .build();
    }
    
    @Bean
    @Qualifier(REPLICA_SERVER2)
    @ConfigurationProperties(prefix = "spring.datasource.replica2")
    public DataSource replicaDataSourceTwo() {
        return DataSourceBuilder.create()
            .build();
    }
    
    @Bean
    public DataSource routingDataSource(
        @Qualifier(SOURCE_SERVER)   DataSource sourceDataSource,
        @Qualifier(REPLICA_SERVER1) DataSource replicaDataSourceOne,
        @Qualifier(REPLICA_SERVER2) DataSource replicaDataSourceTwo
    ) {
        RoutingDataSource routingDataSource = new RoutingDataSource();

        HashMap<Object, Object> dataSourceMap = new HashMap<>();
        dataSourceMap.put("source", sourceDataSource);
        dataSourceMap.put("replica1", replicaDataSourceOne);
        dataSourceMap.put("replica2", replicaDataSourceTwo);
        
        routingDataSource.setTargetDataSources(dataSourceMap);
        routingDataSource.setDefaultTargetDataSource(sourceDataSource);

        return routingDataSource;
    } 
    
    @Bean
    @Primary
    @Profile("!test") // 프로필이 test가 아닌 환경에서 사용
    public DataSource dataSource() {
        DataSource determinedDataSource = routingDataSource(
            sourceDataSource(), 
            replicaDataSourceOne(), 
            replicaDataSourceTwo()
        );
        return new LazyConnectionDataSourceProxy(determinedDataSource);
    }
    
}
