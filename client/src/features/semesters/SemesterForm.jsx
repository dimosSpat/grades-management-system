import { useEffect, useState } from "react";

function SemesterForm({
  semester,
  onSave,
  onCancel,
}) {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    if (semester) {
      setName(semester.name);
      setStartDate(semester.startDate);
      setEndDate(semester.endDate);
    } else {
      setName("");
      setStartDate("");
      setEndDate("");
    }
  }, [semester]);

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave({
      name,
      startDate,
      endDate,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Semester Name
        </label>

        <input
          type="text"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          required
        />
      </div>

      <div>
        <label>
          Start Date
        </label>

        <input
          type="date"
          value={startDate}
          onChange={(e) =>
            setStartDate(e.target.value)
          }
          required
        />
      </div>

      <div>
        <label>
          End Date
        </label>

        <input
          type="date"
          value={endDate}
          onChange={(e) =>
            setEndDate(e.target.value)
          }
          required
        />
      </div>

      <button type="submit">
        {semester
          ? "Update Semester"
          : "Add Semester"}
      </button>

      <button
        type="button"
        onClick={onCancel}
      >
        Cancel
      </button>
    </form>
  );
}

export default SemesterForm;