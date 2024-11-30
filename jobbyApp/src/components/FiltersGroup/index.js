import './index.css'

const FiltersGroup = props => {
  const {
    employmentTypesList,
    changeEmployment,
    activeEmploymentIds,
    changeSalary,
    salaryRangesList,
    activeSalaryId,
  } = props

  const renderEmploymentTypesFiltersList = () => {
    return employmentTypesList.map(employmentType => {
      const isChecked = activeEmploymentIds.includes(
        employmentType.employmentTypeId,
      )

      const onChangeEmploymentItem = event => {
        changeEmployment(employmentType.employmentTypeId, event.target.checked)
      }

      return (
        <li
          className="employment-list-item"
          key={employmentType.employmentTypeId}
        >
          <label className="employment-label">
            <input
              type="checkbox"
              name="employmentType"
              value={employmentType.employmentTypeId}
              checked={isChecked}
              onChange={onChangeEmploymentItem}
              className="employment-checkbox"
            />
            {employmentType.label}
          </label>
        </li>
      )
    })
  }

  const renderEmploymentTypesFilters = () => (
    <div>
      <h1 className="employment-heading">Type of Employment</h1>
      <ul className="employment-list">{renderEmploymentTypesFiltersList()}</ul>
    </div>
  )

  const renderSalaryRangesList = () => (
    <ul className="salary-list">
      {salaryRangesList.map(salary => {
        const onChangeSalaryItem = () => changeSalary(salary.salaryRangeId)

        const isChecked = activeSalaryId === salary.salaryRangeId

        return (
          <li className="salary-list-item" key={salary.salaryRangeId}>
            <label className="salary-label">
              <input
                type="radio"
                name="salary"
                value={salary.salaryRangeId}
                checked={isChecked}
                onChange={onChangeSalaryItem}
                className="salary-radio"
              />
              {salary.label}
            </label>
          </li>
        )
      })}
    </ul>
  )

  const renderSalaryRanges = () => (
    <>
      <h1 className="salary-heading">Salary Range</h1>
      {renderSalaryRangesList()}
    </>
  )

  return (
    <div className="filters-group-container">
      <hr className="separator" />
      {renderEmploymentTypesFilters()}
      <hr className="separator" />
      {renderSalaryRanges()}
    </div>
  )
}

export default FiltersGroup
