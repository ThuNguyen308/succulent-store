import React, { useState } from 'react'

export default function CategoryForm({handleSubmit, value, setValue}) {
  return (
    <form onSubmit={handleSubmit} className="d-flex">
        <input type="text" placeholder="Category Name"
          className="form-control"
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  )
}
