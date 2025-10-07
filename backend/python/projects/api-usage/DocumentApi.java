
@io.swagger.v3.oas.annotations.tags.Tag(name = "DocumentApi",
        description = DocumentApi.description)
public interface DocumentApi {
    String description = "Documents API";
    String BASE_PATH = "/v1/api/user/document";


    @PostMapping(BASE_PATH + "/find")
    ApiResponse<ApiPagingData<FoundDocument>> findDocuments(@Valid
                                                            @RequestBody
                                                            FindDocumentsRequest request);

    @GetMapping(BASE_PATH + "/{id}")
    ApiResponse<DocumentDto> getDocument(
            @PathVariable("id")
            UUID id
    );

    @GetMapping(BASE_PATH + "/{patientId}/signed-kits")
    ApiResponse<Boolean> patientHasSignedKits(
            @PathVariable(value = "patientId")
            @RequestParam(value = "date")
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
            LocalDateTime date
    );

}
