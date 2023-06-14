import PropTypes from "prop-types";
import { useEffect, useState } from "react";

export default function TextArea(props) {
  const {
    value,
    onChange,
    placeholder = "필드를 입력해주세요.",
    width,
    height,
    caption,
    count,
    countUnit,
  } = props;

  // status: danger-1 | success
  const [status, setStatus] = useState(null);
  const StylesByStatus = () => {
    if (status === "success") {
      return "text-success";
    } else if (status === "danger") {
      return "text-danger-1";
    } else {
      return "text-gray-2";
    }
  };
  const borderByStatus = () => {
    if (status === "success") {
      return "border-success";
    } else if (status === "danger") {
      return "border-danger-1";
    } else {
      return "border-gray-4 focus:border-primary-1";
    }
  };

  const onBlur = (e) => {
    if (!count) return;
    if (!value || value.length < count) {
      setStatus("danger");
    } else {
      setStatus("success");
    }
  };

  useEffect(() => {
    if (!count || !status || !value) return;

    if (value.length < count) {
      setStatus("danger");
    } else {
      setStatus("success");
    }
  }, [value]);

  return (
    <>
      <textarea
        className={`text-body-2 box-border flex items-center p-[16px] border ${borderByStatus()} rounded-[12px] resize-none appearance-none	placeholder:text-gray-3 focus:outline-none`}
        placeholder={placeholder}
        onChange={onChange}
        defaultValue={value || ""}
        style={{ width, height }}
        onBlur={onBlur}
        {...props}
      />
      <div className="flex justify-between gap-[8px] m-[4px]">
        <div
          className={`text-caption-1 ${StylesByStatus()} truncate break-word`}
        >
          {status === "danger" && caption}
        </div>
        <div className={`text-caption-1 ${StylesByStatus()}`}>
          {count && `${value ? value.length : 0}`}
          {countUnit}
        </div>
      </div>
    </>
  );
}

TextArea.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
