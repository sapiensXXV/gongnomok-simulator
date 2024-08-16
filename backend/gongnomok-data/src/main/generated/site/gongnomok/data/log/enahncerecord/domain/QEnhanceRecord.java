package site.gongnomok.data.log.enahncerecord.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QEnhanceRecord is a Querydsl query type for EnhanceRecord
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QEnhanceRecord extends EntityPathBase<EnhanceRecord> {

    private static final long serialVersionUID = -626182638L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QEnhanceRecord enhanceRecord = new QEnhanceRecord("enhanceRecord");

    public final StringPath challengerName = createString("challengerName");

    public final DateTimePath<java.time.LocalDateTime> createdAt = createDateTime("createdAt", java.time.LocalDateTime.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final NumberPath<Integer> iev = createNumber("iev", Integer.class);

    public final NumberPath<Long> itemId = createNumber("itemId", Long.class);

    public final StringPath itemName = createString("itemName");

    public final NumberPath<Integer> score = createNumber("score", Integer.class);

    public final StringPath scroll = createString("scroll");

    public final QEnhanceRecordStatus status;

    public final QEnhanceRecordSuccess success;

    public final NumberPath<Integer> tries = createNumber("tries", Integer.class);

    public QEnhanceRecord(String variable) {
        this(EnhanceRecord.class, forVariable(variable), INITS);
    }

    public QEnhanceRecord(Path<? extends EnhanceRecord> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QEnhanceRecord(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QEnhanceRecord(PathMetadata metadata, PathInits inits) {
        this(EnhanceRecord.class, metadata, inits);
    }

    public QEnhanceRecord(Class<? extends EnhanceRecord> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.status = inits.isInitialized("status") ? new QEnhanceRecordStatus(forProperty("status")) : null;
        this.success = inits.isInitialized("success") ? new QEnhanceRecordSuccess(forProperty("success")) : null;
    }

}

