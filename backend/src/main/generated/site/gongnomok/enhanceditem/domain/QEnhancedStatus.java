package site.gongnomok.enhanceditem.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QEnhancedStatus is a Querydsl query type for EnhancedStatus
 */
@Generated("com.querydsl.codegen.DefaultEmbeddableSerializer")
public class QEnhancedStatus extends BeanPath<EnhanceStatus> {

    private static final long serialVersionUID = -724704805L;

    public static final QEnhancedStatus enhancedStatus = new QEnhancedStatus("enhancedStatus");

    public final NumberPath<Integer> acc = createNumber("acc", Integer.class);

    public final NumberPath<Integer> avo = createNumber("avo", Integer.class);

    public final NumberPath<Integer> dex = createNumber("dex", Integer.class);

    public final NumberPath<Integer> hp = createNumber("hp", Integer.class);

    public final NumberPath<Integer> intel = createNumber("intel", Integer.class);

    public final NumberPath<Integer> jump = createNumber("jump", Integer.class);

    public final NumberPath<Integer> luk = createNumber("luk", Integer.class);

    public final NumberPath<Integer> mgAtk = createNumber("mgAtk", Integer.class);

    public final NumberPath<Integer> mgDef = createNumber("mgDef", Integer.class);

    public final NumberPath<Integer> move = createNumber("move", Integer.class);

    public final NumberPath<Integer> mp = createNumber("mp", Integer.class);

    public final NumberPath<Integer> phyAtk = createNumber("phyAtk", Integer.class);

    public final NumberPath<Integer> phyDef = createNumber("phyDef", Integer.class);

    public final NumberPath<Integer> str = createNumber("str", Integer.class);

    public QEnhancedStatus(String variable) {
        super(EnhanceStatus.class, forVariable(variable));
    }

    public QEnhancedStatus(Path<? extends EnhanceStatus> path) {
        super(path.getType(), path.getMetadata());
    }

    public QEnhancedStatus(PathMetadata metadata) {
        super(EnhanceStatus.class, metadata);
    }

}

