package site.gongnomok.data.infrastructure;

import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.datasource.lookup.AbstractRoutingDataSource;

import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;


@Slf4j
public class RoutingDataSource extends AbstractRoutingDataSource {

    private final List<String> replicaKeys = List.of("replica1", "replica2");
    private final AtomicInteger counter = new AtomicInteger(0); 
    
    @Override
    protected Object determineCurrentLookupKey() {
//        레플리케이션 중지
//        boolean isReadOnly = TransactionSynchronizationManager.isCurrentTransactionReadOnly();
//        if (isReadOnly) {
//            int index = counter.getAndIncrement() % replicaKeys.size();
//            return replicaKeys.get(index);
//        }
        return "source";
    }
}
