import { useState } from 'react';
// Import React FilePond
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginImageCrop from 'filepond-plugin-image-crop';
import FilePondPluginImageResize from 'filepond-plugin-image-resize';
import FilePondPluginImageTransform from 'filepond-plugin-image-transform';

// Import FilePond styles
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

registerPlugin(
  FilePondPluginFileValidateType,
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginImageCrop,
  FilePondPluginImageResize,
  FilePondPluginImageTransform,
);

export const FileUpload = ({file} : {file: string}) => {
  const [files, setFiles] = useState(file ? [file] : []);

  return (
    <>
      <FilePond
        files={files}
        name="files"
        server="/api"
        acceptedFileTypes={['image/png', 'image/jpeg']}
        imagePreviewHeight={170}
        imageCropAspectRatio='1:1'
        imageResizeTargetWidth={100}
        imageResizeTargetHeight={100}
        stylePanelLayout='compact circle'
        styleLoadIndicatorPosition='center bottom'
        styleProgressIndicatorPosition='right bottom'
        styleButtonRemoveItemPosition='left bottom'
        styleButtonProcessItemPosition='right bottom'
        instantUpload={false}
      />
    </>
  )
}