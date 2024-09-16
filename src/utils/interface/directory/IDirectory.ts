export interface IDirectory {
  DirectoryId: Number
  DirectoryName: String
  ParentFId: Number
  Available: Boolean
  ForClient: Boolean
}

export interface ISubdirectory {
  SubDirectoryId: Number
  DirectoryFId: Number
  SubDirectoryName: String
}
