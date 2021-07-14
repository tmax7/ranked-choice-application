function fullNameStringFrom(name) {
    const firstName = name.firstName ?? '';
    const middleName = name.middleName ?? '';
    const lastName = name.lastName ?? '';
    const suffix = name.suffix ?? '';
    return `${firstName} ${middleName} ${lastName} ${suffix}`
}

export {fullNameStringFrom as default};