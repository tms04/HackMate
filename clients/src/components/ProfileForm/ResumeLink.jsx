import PropTypes from 'prop-types';
import { FaFilePdf, FaExternalLinkAlt } from 'react-icons/fa';

const ResumeLink = ({ resumeLink, setResumeLink }) => {
  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text font-medium flex items-center gap-2">
          <FaFilePdf /> Resume Link
        </span>
      </label>
      <div className="flex flex-col gap-2">
        <div className="input-group">
          <input
            type="url"
            placeholder="Enter the URL to your resume (Google Drive, Dropbox, etc.)"
            className="input input-bordered w-full"
            value={resumeLink || ''}
            onChange={(e) => setResumeLink(e.target.value)}
          />
          {resumeLink && (
            <a
              href={resumeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-square btn-neutral"
            >
              <FaExternalLinkAlt />
            </a>
          )}
        </div>
        <div className="text-xs text-neutral-500 ml-2">
          Provide a link to your resume uploaded on Google Drive, Dropbox, or any other cloud storage
        </div>
      </div>
    </div>
  );
};

ResumeLink.propTypes = {
  resumeLink: PropTypes.string,
  setResumeLink: PropTypes.func.isRequired
};

export default ResumeLink; 