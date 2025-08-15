package site.gongnomok.data.item.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QAvailableJob is a Querydsl query type for AvailableJob
 */
@Generated("com.querydsl.codegen.DefaultEmbeddableSerializer")
public class QAvailableJob extends BeanPath<AvailableJob> {

    private static final long serialVersionUID = 247181817L;

    public static final QAvailableJob availableJob = new QAvailableJob("availableJob");

    public final BooleanPath bowman = createBoolean("bowman");

    public final BooleanPath common = createBoolean("common");

    public final BooleanPath magician = createBoolean("magician");

    public final BooleanPath thief = createBoolean("thief");

    public final BooleanPath warrior = createBoolean("warrior");

    public QAvailableJob(String variable) {
        super(AvailableJob.class, forVariable(variable));
    }

    public QAvailableJob(Path<? extends AvailableJob> path) {
        super(path.getType(), path.getMetadata());
    }

    public QAvailableJob(PathMetadata metadata) {
        super(AvailableJob.class, metadata);
    }

}

