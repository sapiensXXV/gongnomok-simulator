package site.gongnomok.data.infrastructure;

import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.datasource.lookup.AbstractRoutingDataSource;
import org.springframework.transaction.support.TransactionSynchronizationManager;

import java.util.concurrent.atomic.AtomicLong;


@Slf4j
public class RoutingDataSource extends AbstractRoutingDataSource {
    
    private AtomicLong counter = new AtomicLong(0);
    
    @Override
    protected Object determineCurrentLookupKey() {
        boolean isReadOnly = TransactionSynchronizationManager.isCurrentTransactionReadOnly();
        if (isReadOnly) {
            if (counter.get() == Long.MAX_VALUE) {
                counter = new AtomicLong(0);
            }
            if (counter.getAndIncrement() % 2 == 0) {
                return "replica1";
            } else {
                return "replica2";
            }
        }
        return "source";
    }
}
