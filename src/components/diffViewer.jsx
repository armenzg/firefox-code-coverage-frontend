import { Link } from 'react-router-dom';
import DiffFile from './diffFile';
import CoverageMeta from './coverageMeta';
import CoverageFooter from './coverageFooter';

const DiffViewer = ({
  appError, changeset, coverage, parsedDiff,
}) => (
  <div className="codecoverage-diffviewer">
    <div className="return-home">
      <Link to="/" href="/">Return to main page</Link>
    </div>
    <span className="error_message">{appError}</span>
    {(coverage && coverage.show) && (
      <div>
        <CoverageMeta
          changeset={changeset}
          node={coverage.node}
          overallCoverage={coverage.overall_cur}
          summary={coverage.summary}
        />
        {parsedDiff.map((diffBlock) => {
          // We only push down the subset of code coverage data
          // applicable to a file
          const path = (diffBlock.to === '/dev/null') ? diffBlock.from : diffBlock.to;
          return (<DiffFile
            buildRev={(coverage.build_changeset).substring(0, 12)}
            diffBlock={diffBlock}
            fileCoverageDiffs={(coverage) ? coverage.diffs[path] : undefined}
            key={path}
            path={path}
          />);
        })}
        <CoverageFooter
          gitBuildCommit={coverage.git_build_changeset}
          hgNode={coverage.node}
        />
      </div>
    )}
  </div>
);

export default DiffViewer;
